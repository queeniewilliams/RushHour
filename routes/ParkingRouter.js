const router = require('express').Router()
const controller = require('../controllers/CoordinateController')
const middleware = require('../middleware')

router.get('/all', controller.GetParking)
router.get(
  '/:user_id',
  middleware.StripHeaders,
  middleware.VerifyToken,
  controller.GetMyParking
)
router.post(
  '/add',
  middleware.StripHeaders,
  middleware.VerifyToken,
  controller.CreateParking
)
router.put(
  '/update/:coordinate_id',
  middleware.StripHeaders,
  middleware.VerifyToken,
  controller.UpdateParking
)
router.delete(
  '/delete/:coordinate_id',
  middleware.StripHeaders,
  middleware.VerifyToken,
  controller.DeleteParking
)
module.exports = router
