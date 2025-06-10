import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Platform from './Platform.js';
import CastCrew from './CastCrew.js';

const Movie = sequelize.define('Movie', {
  MovieID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  PlatformID: { type: DataTypes.INTEGER, references: { model: Platform, key: 'PlatformID' } },
  Title: { type: DataTypes.STRING, allowNull: false },
  Year: { type: DataTypes.INTEGER },
  Description: { type: DataTypes.TEXT },
  AVGrating: { type: DataTypes.FLOAT },
  Genre: { type: DataTypes.STRING },
  IMGAddress: { type: DataTypes.STRING },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 }
});

Movie.belongsTo(Platform, { foreignKey: 'PlatformID' });
Movie.hasOne(CastCrew, { foreignKey: 'MovieID' });
CastCrew.belongsTo(Movie, { foreignKey: 'MovieID' });

export default Movie;