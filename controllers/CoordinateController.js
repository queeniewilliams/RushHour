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

const GetMyParking = async (req, res) => {
  let myParking = await Coordinate.findAll({
    where: { userId: req.params.user_id }
  })
  res.send(myParking)
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
  console.log(req.params.coordinate_id)
  try {
    const newParking = await Coordinate.update(
      { ...req.body },
      { where: { id: req.params.coordinate_id }, returning: true }
    )
    res.send(newParking)
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
  DeleteParking,
  UpdateParking
}
