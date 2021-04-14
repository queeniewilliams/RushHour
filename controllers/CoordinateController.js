const { Coordinate } = require('../models')
const { Op } = require('sequelize')

const GetParking = async (req, res) => {
  try {
    const parkings = await Coordinate.findAll()
    res.send(parkings)
  } catch (error) {
    throw error
  }
}

const CreateParking = async (req, res) => {
  try {
    const addParking = await Coordinate.create({ ...req.body })
    res.send(addParking)
  } catch (error) {
    throw error
  }
}

const UpdateParking = async (req, res) => {
  try {
    const parking = await Coordinate.update(
      { ...req.body },
      { where: { id: req.params.parking_id }, returning: true }
    )
    res.send(parking)
  } catch (error) {
    throw error
  }
}
const DeleteParking = async (req, res) => {
  try {
    await Coordinate.destroy({ where: { id: req.params.parking_id } })
    res.send({
      msg: 'Parking Deleted',
      payload: req.params.parking_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetParking,
  CreateParking,
  UpdateParking,
  DeleteParking
}
