// backend/controllers/preferenceController.js
import Preference from '../models/Preference.js';

export async function savePreferences(req, res) {
  try {
    const { movies } = req.body;
    const userId = req.userId;
    const preference = await create({ userId, movies });
    res.status(201).json(preference);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}