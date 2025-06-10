import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const CastCrew = sequelize.define('CastCrew', {
  CastCrewID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Director: { type: DataTypes.STRING },
  MainActor: { type: DataTypes.STRING },
  MainActress: { type: DataTypes.STRING },
  Writer: { type: DataTypes.STRING },
  ProductionBy: { type: DataTypes.STRING }
});

export default CastCrew;