import Platform from '../models/Platform.js';

export async function createPlatform(req, res) {
  try {
    const platform = await Platform.create(req.body);
    res.status(201).json(platform);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getAllPlatforms(req, res) {
  try {
    const platforms = await Platform.findAll();
    res.json(platforms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getPlatformById(req, res) {
  try {
    const platform = await Platform.findByPk(req.params.id);
    if (!platform) return res.status(404).json({ error: 'Platform not found' });
    res.json(platform);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updatePlatform(req, res) {
  try {
    const platform = await Platform.findByPk(req.params.id);
    if (!platform) return res.status(404).json({ error: 'Platform not found' });
    await platform.update(req.body);
    res.json(platform);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deletePlatform(req, res) {
  try {
    const platform = await Platform.findByPk(req.params.id);
    if (!platform) return res.status(404).json({ error: 'Platform not found' });
    await platform.destroy();
    res.json({ message: 'Platform deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}