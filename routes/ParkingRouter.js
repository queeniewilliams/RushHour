const router = require('express').Router()
const controller = require('../controllers/ParkingSpaceController')

router.post('/', controller.CreateParking)

module.exports = router
