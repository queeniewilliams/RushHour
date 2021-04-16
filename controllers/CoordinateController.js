const { Coordinate } = require('../models')
const { Op } = require('sequelize')

const GetParking = async (req, res) => {
  try {
    const parkings = await Coordinate.findAll()
    console.log(parkings)
    res.send(parkings)
  } catch (error) {
    throw error
  }
}

const GetParkingByDistance = async (req, res) => {
  const query = req.params.query
  const latitude = query.latitude
  const longitude = query.longitude
  const myDistance = 10000
  try {
    const parkings = await Coordinate.findAll({
      attributes: {
        include: [
          [
            models.Coordinate.Sequelize.fn(
              'ST_Distance',
              models.CoordinateSequelize.col('origin'),
              models.CoordinateSequelize.fn('ST_MakePoint', longitude, latitude)
            ),
            'distance'
          ]
        ]
      },
      where: models.Coordinate.Sequelize.where(
        models.Coordinate.Sequelize.fn(
          'ST_DWithin',
          models.Coordinate.Sequelize.col('origin'),
          models.Coordinate.Sequelize.fn('ST_MakePoint', longitude, latitude),
          myDistance
        ),
        true
      ),
      order: models.Coordinate.Sequelize.literal('distance ASC'),
      limit: 10
    })
    res.send(parkings)
  } catch (error) {
    throw error
  }
}

const GetMyParking = async (req, res) => {
  let myParking = await Coordinate.findAll({
    where: { userId: req.params.user_id }
  })
  res.send(myParking)
}

const CreateParking = async (req, res) => {
  try {
    const addParking = await Coordinate.create({ ...req.body })
    console.log(req.body)
    res.send(addParking)
  } catch (error) {
    throw error
  }
}

const UpdateParking = async (req, res) => {
  try {
    const parking = await Coordinate.update(
      { ...req.body },
      { where: { id: req.params.coordinate_id }, returning: true }
    )
    res.send(parking)
  } catch (error) {
    throw error
  }
}
const DeleteParking = async (req, res) => {
  try {
    await Coordinate.destroy({ where: { id: req.params.coordinate_id } })
    res.send({
      msg: 'Parking Deleted',
      payload: req.params.coordinate_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetParking,
  GetMyParking,
  CreateParking,
  UpdateParking,
  DeleteParking,
  GetParkingByDistance
}
