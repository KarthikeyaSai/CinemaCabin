// backend/models/Preference.js
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Preference = sequelize.define('Preference', {
  movies: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
});

Preference.belongsTo(User, { foreignKey: 'userId' });

export default Preference;