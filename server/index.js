import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();


// ✅ Create the Express app
const app = express();
app.use(express.json());

// ✅ Load your API key
const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) {
  console.warn('⚠️  OPENAI_API_KEY not set in .env');
}

// ✅ Define chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages) return res.status(400).json({ error: 'messages required' });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    const assistant = data.choices?.[0]?.message ?? { role: 'assistant', content: 'No reply' };
    res.json({ assistant, raw: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error', details: String(err) });
  }
});

// ✅ Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Server listening on http://localhost:${PORT}`));
