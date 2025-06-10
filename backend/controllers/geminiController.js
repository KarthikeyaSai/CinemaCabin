import axios from 'axios';
import dotenv from 'dotenv';
const model = "gemini-2.0-flash";
dotenv.config();

export async function getRecommendations(req, res) {
  const { movies } = req.body;
  const prompt = `Recommend 1 movies for a user who likes: ${movies.join(', ')}. Return only the title of the recommended movie with it's release year.`;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const recommendations = text
      .split('\n')
      .map(line => line.replace(/^[0-9\-\.\)]*\s*/, '').trim())
      .filter(line => line);

    res.json({ recommendations });
  } catch (error) {
    console.error('Gemini API error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get recommendations from Gemini API' });
  }
}