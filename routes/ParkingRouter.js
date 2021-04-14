const router = require('express').Router()
const controller = require('../controllers/CoordinateController')
const { route } = require('./AuthRouter')

router.get('/', controller.GetParking)
router.get('/:user_id', controller.GetMyParking)
router.post('/add', controller.CreateParking)
router.put('/update/:coordinate_id', controller.UpdateParking)
router.delete('/delete/:coordinate_id', controller.DeleteParking)
module.exports = router
