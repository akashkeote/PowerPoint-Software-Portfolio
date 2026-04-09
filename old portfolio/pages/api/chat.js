import axios from 'axios';
import { google } from 'googleapis';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const CHATGPT_API_KEY = process.env.CHATGPT_API_KEY;
const GOOGLE_CREDENTIALS_JSON = process.env.GOOGLE_CREDENTIALS_JSON;
const SHEET_ID = process.env.SHEET_ID;
const Model1 = process.env.Model1;
const Model2 = process.env.Model2;

async function initGoogleSheets(sheetName) {
  try {
    if (!GOOGLE_CREDENTIALS_JSON || !SHEET_ID) {
      console.log('Google Sheets credentials not configured');
      return { sheets: null, SHEET_ID, sheetName };
    }
    const credentials = JSON.parse(GOOGLE_CREDENTIALS_JSON);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });
    return { sheets, SHEET_ID, sheetName };
  } catch (error) {
    console.error('Google Sheets initialization error:', error);
    return { sheets: null, SHEET_ID, sheetName };
  }
}

async function chatWithGemini(userInput) {
  const url = 'https://openrouter.ai/api/v1/chat/completions';
  const headers = {
    'Authorization': `Bearer ${GEMINI_API_KEY}`,
    'Content-Type': 'application/json',
  };
  const data = {
    model: Model1,
    messages: [{ role: 'user', content: userInput }],
  };
  try {
    const response = await axios.post(url, data, { headers });
    return response.data.choices[0].message.content;
  } catch (e) {
    console.error('Gemini Error:', e.message);
    return "Sorry, I couldn't process that request.";
  }
}

async function chatWithChatgpt(userInput) {
  const url = 'https://openrouter.ai/api/v1/chat/completions';
  const headers = {
    'Authorization': `Bearer ${CHATGPT_API_KEY}`,
    'Content-Type': 'application/json',
  };
  const data = {
    model: Model2,
    messages: [{ role: 'user', content: userInput }],
  };
  try {
    const response = await axios.post(url, data, { headers });
    return response.data.choices[0].message.content;
  } catch (e) {
    console.error('ChatGPT Error:', e.message);
    return "Sorry, I couldn't process that request.";
  }
}

const userSessions = new Map();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, bot = 'gemini', sessionId, userData: frontendUserData } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    let userData = userSessions.get(sessionId) || { name: null, email: null, contact: null };
    if (frontendUserData) {
      userData = { ...userData, ...frontendUserData };
      userSessions.set(sessionId, userData);
    }
    if (!userData.name) {
      userData.name = message;
      userSessions.set(sessionId, userData);
      return res.json({ 
        response: "Nice to meet you! How can I help you today?",
        userData: userData
      });
    }
    let botResponse;
    if (bot === 'chatgpt') {
      botResponse = await chatWithChatgpt(message);
    } else {
      botResponse = await chatWithGemini(message);
    }
    if (!GEMINI_API_KEY && !CHATGPT_API_KEY) {
      botResponse = "Hi! I'm a demo chatbot. To enable AI responses, please configure API keys in Vercel environment variables.";
    }
    try {
      const { sheets, SHEET_ID, sheetName } = await initGoogleSheets('akashkeote');
      if (sheets) {
        const values = [[
          userData.name,
          userData.email,
          userData.contact,
          message,
          new Date().toISOString().replace('T', ' ').slice(0, 19),
          bot,
          botResponse
        ]];
        await sheets.spreadsheets.values.append({
          spreadsheetId: SHEET_ID,
          range: `${sheetName}!A1`,
          valueInputOption: 'RAW',
          requestBody: { values },
        });
        console.log('📊 Conversation logged successfully');
      } else {
        console.log('❌ Google Sheets not configured, skipping logging');
      }
    } catch (e) {
      console.error('❌ Logging Failed:', e.message);
    }
    return res.json({ 
      response: botResponse,
      userData: userData
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 