const router = require('express').Router()
const controller = require('../controllers/CoordinateController')

router.get('/', controller.GetParking)
router.post('/', controller.CreateParking)

module.exports = router
