import Movie from '../models/Movie.js';
import Platform from '../models/Platform.js';
import CastCrew from '../models/CastCrew.js';

function mapMoviePoster(movie) {
  const m = movie.toJSON ? movie.toJSON() : movie;
  m.poster = m.IMGAddress && !m.IMGAddress.startsWith('/assets/Posters/')
    ? `/assets/Posters/${m.IMGAddress}`
    : m.IMGAddress;
  m.id = m.MovieID; // Add this line for frontend compatibility
  return m;
}

export async function createMovie(req, res) {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getAllMovies(req, res) {
  try {
    const movies = await Movie.findAll({ include: [Platform, CastCrew] });
    res.json(movies.map(mapMoviePoster));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getMovieById(req, res) {
  try {
    const movie = await Movie.findByPk(req.params.id, { include: [Platform, CastCrew] });
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(mapMoviePoster(movie));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateMovie(req, res) {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    await movie.update(req.body);
    res.json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteMovie(req, res) {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    await movie.destroy();
    res.json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getTopRatedMovies(req, res) {
  try {
    const movies = await Movie.findAll({
      order: [['AVGrating', 'DESC']],
      limit: 10,
      include: [Platform, CastCrew]
    });
    res.json(movies.map(mapMoviePoster));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getPopularMovies(req, res) {
  try {
    const movies = await Movie.findAll({
      order: [['AVGrating', 'DESC']],
      limit: 10,
      include: [Platform, CastCrew]
    });
    res.json(movies.map(mapMoviePoster));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getFriendsRatingsMovies(req, res) {
  try {
    const movies = await Movie.findAll({ include: [Platform, CastCrew] });
    res.json(movies.map(mapMoviePoster));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function likeMovie(req, res) {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    movie.likes = (movie.likes || 0) + 1;
    await movie.save();
    res.json({ likes: movie.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}