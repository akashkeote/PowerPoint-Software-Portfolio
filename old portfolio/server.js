const express = require('express');
const session = require('express-session');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Session setup
app.use(session({
  secret: process.env.SECRET_KEY || 'default_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// API Keys from Environment Variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const CHATGPT_API_KEY = process.env.CHATGPT_API_KEY;
const GOOGLE_CREDENTIALS_JSON = process.env.GOOGLE_CREDENTIALS_JSON; // JSON string
const SHEET_ID = process.env.SHEET_ID;
const Model1 = process.env.Model1;
const Model2 = process.env.Model2;

// Google Sheets API setup
async function initGoogleSheets(sheetName) {
}

// Serve static files (images, static, etc.) - these should be before React build
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Serve React build static files
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all: serve React's index.html for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

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

app.post('/chat', async (req, res) => {
  const userInput = req.body.message;
  const botChoice = req.body.bot || 'gemini';

  // Initialize user data in session if not present
  if (!req.session.userData) {
    req.session.userData = { name: null, email: null, contact: null };
    return res.json({ response: "Hello! What's your name?" });
  }

  const userData = req.session.userData;
  console.log('Current userData:', userData);

  // Collect name
  if (!userData.name) {
    userData.name = userInput;
    req.session.userData = userData;
    console.log('Asking for email');
    return res.json({ response: "Got your name! What's your email?" });
  }

  // Collect email
  if (!userData.email) {
    userData.email = userInput;
    req.session.userData = userData;
    console.log('Asking for mobile number');
    return res.json({ response: "Thanks! What's your mobile number?" });
  }

  // Collect contact
  if (!userData.contact) {
    userData.contact = userInput;
    req.session.userData = userData;
    console.log('Asking how to assist');
    return res.json({ response: "Now, how can I assist you?" });
  }

  // Get AI Response
  let botResponse;
  if (botChoice === 'chatgpt') {
    botResponse = await chatWithChatgpt(userInput);
  } else {
    botResponse = await chatWithGemini(userInput);
  }

  // Log conversation to Google Sheets
  try {
    const { sheets, SHEET_ID, sheetName } = await initGoogleSheets('akashkeote');
    if (sheets) {
      const values = [[
        userData.name,
        userData.email,
        userData.contact,
        userInput,
        new Date().toISOString().replace('T', ' ').slice(0, 19),
        botChoice,
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
      console.error('❌ Logging Failed: Google Sheets service initialization failed');
    }
  } catch (e) {
    console.error('❌ Logging Failed:', e.message);
  }

  return res.json({ response: botResponse });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});