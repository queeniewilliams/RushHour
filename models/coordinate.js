'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Coordinate extends Model {
    static associate(models) {
      Coordinate.belongsTo(models.User, { as: 'owner', foreignKey: 'userId' })
      Coordinate.hasMany(models.Comment, {
        as: 'comments',
        foreignKey: 'coordinateId'
      })
    }
  }
  Coordinate.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: { model: 'users', key: 'id' }
      },
      longitude: DataTypes.FLOAT,
      latitude: DataTypes.FLOAT,
      address: DataTypes.STRING,
      image: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Coordinate',
      tableName: 'coordinates'
    }
  )
  return Coordinate
}
