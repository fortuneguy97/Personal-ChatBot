# Personal AI Chatbot

A simple, production-minded personal chatbot for portfolio demos.

## Requirements
- Node 18+ (or a version supporting fetch) or add node-fetch
- An OpenAI API key

## Setup
1. Clone
2. Copy `.env.example` to `.env` and add your OPENAI_API_KEY
3. Install: `npm install`
4. Start (dev): `npm run start`

Visit `http://localhost:5173` for frontend and server runs on `http://localhost:3001` (proxy endpoint at `/api/chat`).

## Deploy
- Frontend: Vercel / Netlify (Vite app)
- Server: Render / Railway / Heroku (set OPENAI_API_KEY in the host's env)

## Security note
Never expose your OpenAI key in client-side code. Use a server-side proxy (like the included server) or a serverless function.


## Customization ideas
- Theme/personality: change the system prompt in the server before sending messages to the API.
- Attachments: add file upload and send file text to the model (with appropriate parsing).
- Authentication: add OAuth / magic link to show private demos in portfolio.
- Conversation snippets: create export buttons to download chat as PDF or text.