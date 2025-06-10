// backend/index.js
import express from 'express';
import sequelize from './config/database.js';
import cors from 'cors';

import authRoutes from './routes/Auth.js';
import movieRoutes from './routes/movies.js';
import reviewRoutes from './routes/reviews.js';
import preferenceRoutes from './routes/preferences.js';
import recommendationRoutes from './routes/recommendations.js';

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files (e.g., movie posters)
app.use('/assets', express.static('../frontend/public/assets'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/preferences', preferenceRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Sync database and start server
const PORT = process.env.PORT || 3001;
sequelize.sync({ force: true }).then(async () => {
  const Movie = (await import('./models/Movie.js')).default;
  await Movie.bulkCreate([
    {
      Title: 'The Dark Knight',
      Year: 2008,
      IMGAddress: 'darkknight.jpg',
      AVGrating: 4.8,
      Genre: 'Action,Crime,Drama',
      Description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    },
    {
      Title: 'Shawshank Redemption',
      Year: 1994,
      IMGAddress: 'shawshankRed.webp',
      AVGrating: 4.9,
      Genre: 'Drama',
      Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    },
    {
      Title: 'Inception',
      Year: 2010,
      IMGAddress: 'inception.jpg',
      AVGrating: 4.7,
      Genre: 'Action,Sci-Fi,Thriller',
      Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    },
    {
      Title: 'Parasite',
      Year: 2019,
      IMGAddress: 'parasite.jpg',
      AVGrating: 4.6,
      Genre: 'Thriller,Drama,Comedy',
      Description: 'A poor family schemes to become employed by a wealthy family by infiltrating their household and posing as unrelated, highly qualified individuals.',
    },
    {
      Title: 'Everything Everywhere All at Once',
      Year: 2022,
      IMGAddress: 'EEAO.jpg',
      AVGrating: 4.5,
      Genre: 'Action,Comedy,Sci-Fi',
      Description: 'An aging Chinese immigrant is swept up in an insane adventure, where she alone can save what\'s important to her by connecting with the lives she could have led in other universes.',
    },
  ]);

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});