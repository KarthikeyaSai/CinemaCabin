import { DataTypes } from 'sequelize';

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('Movies', 'likes', {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('Movies', 'likes');
}
