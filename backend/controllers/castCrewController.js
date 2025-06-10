import CastCrew from '../models/CastCrew.js';

export async function createCastCrew(req, res) {
  try {
    const castCrew = await CastCrew.create(req.body);
    res.status(201).json(castCrew);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getCastCrewByMovie(req, res) {
  try {
    const castCrew = await CastCrew.findOne({ where: { MovieID: req.params.movieId } });
    if (!castCrew) return res.status(404).json({ error: 'Cast/Crew not found for this movie' });
    res.json(castCrew);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateCastCrew(req, res) {
  try {
    const castCrew = await CastCrew.findByPk(req.params.id);
    if (!castCrew) return res.status(404).json({ error: 'Cast/Crew not found' });
    await castCrew.update(req.body);
    res.json(castCrew);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteCastCrew(req, res) {
  try {
    const castCrew = await CastCrew.findByPk(req.params.id);
    if (!castCrew) return res.status(404).json({ error: 'Cast/Crew not found' });
    await castCrew.destroy();
    res.json({ message: 'Cast/Crew deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}