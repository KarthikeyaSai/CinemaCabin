import User from './User.js';
import Movie from './Movie.js';
import Review from './Review.js';
import Platform from './Platform.js';
import CastCrew from './CastCrew.js';

// User writes Review
User.hasMany(Review, { foreignKey: 'UserID' });
Review.belongsTo(User, { foreignKey: 'UserID' });

// Movie has many Reviews
Movie.hasMany(Review, { foreignKey: 'MovieID' });
Review.belongsTo(Movie, { foreignKey: 'MovieID' });

// Movie is on Platform
Platform.hasMany(Movie, { foreignKey: 'PlatformID' });
Movie.belongsTo(Platform, { foreignKey: 'PlatformID' });

// Movie has CastCrew (one-to-one or one-to-many as needed)
Movie.hasOne(CastCrew, { foreignKey: 'MovieID' });
CastCrew.belongsTo(Movie, { foreignKey: 'MovieID' });

export { User, Movie, Review, Platform, CastCrew };