const router = require('express').Router()
const controller = require('../controllers/CoordinateController')

// router.get('/',controller.GetParkingByDistance)
router.get('/all', controller.GetParking)
router.get('/:user_id', controller.GetMyParking)
router.post('/add', controller.CreateParking)
router.delete('/delete/:coordinate_id', controller.DeleteParking)
module.exports = router
