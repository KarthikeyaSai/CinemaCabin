import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Movie from './Movie.js';

const Review = sequelize.define('Review', {
  ReviewID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Rating: { type: DataTypes.FLOAT },
  ReviewText: { type: DataTypes.TEXT },
  ReviewDate: { type: DataTypes.DATEONLY }
});

Review.belongsTo(User, { foreignKey: 'UserID' });
Review.belongsTo(Movie, { foreignKey: 'MovieID' });

export default Review;