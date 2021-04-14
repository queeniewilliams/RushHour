'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Coordinate extends Model {
    static associate(models) {
      Coordinate.belongsTo(models.User, { foreignKey: 'userId' })
      Coordinate.hasMany(models.Comment, { foreignKey: 'coordinateId' })
    }
  }
  Coordinate.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: { model: 'users', key: 'id' }
      },
      longitude: DataTypes.INTEGER,
      latitude: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Coordinate',
      tableName: 'coordinates'
    }
  )
  return Coordinate
}
