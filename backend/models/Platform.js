import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Platform = sequelize.define('Platform', {
  PlatformID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  PlatformName: { type: DataTypes.STRING, allowNull: false },
  PlatformLink: { type: DataTypes.STRING }
});

export default Platform;