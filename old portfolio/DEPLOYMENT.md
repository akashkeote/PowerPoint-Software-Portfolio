# Vercel Deployment Instructions

## Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Make sure you have a Vercel account

## Environment Variables
You need to set these environment variables in your Vercel project:

- `GEMINI_API_KEY` - Your Gemini API key
- `CHATGPT_API_KEY` - Your ChatGPT API key  
- `Model1` - Model name for Gemini (e.g., "google/gemini-pro")
- `Model2` - Model name for ChatGPT (e.g., "deepseek-ai/deepseek-chat")

## Deployment Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Deploy to Vercel:**
   ```bash
   vercel
   ```

4. **Set environment variables in Vercel dashboard:**
   - Go to your project in Vercel dashboard
   - Navigate to Settings > Environment Variables
   - Add all the required environment variables

5. **Redeploy after setting environment variables:**
   ```bash
   vercel --prod
   ```

## Project Structure
- `/api/chat.js` - Serverless function for chat API
- `/src/components/Chatbot.js` - React component for chat interface
- `vercel.json` - Vercel configuration

## Notes
- The chat functionality uses in-memory storage for sessions
- Google Sheets logging is disabled for Vercel deployment
- All API calls are made to `/api/chat` endpoint 