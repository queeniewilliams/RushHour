const router = require('express').Router()
const controller = require('../controllers/AuthController')
const middleware = require('../middleware')

// router.get('/all', controller.GetAllUsers)

router.post('/login', controller.Login)
router.post('/register', controller.Register)
router.get(
  '/session',
  middleware.StripHeaders,
  middleware.VerifyToken,
  controller.GetCurrentUser
)
router.get('/profile/:user_id', controller.GetProfile)
module.exports = router
