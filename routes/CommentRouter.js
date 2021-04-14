const router = require('express').Router()
const controller = require('../controllers/commentController')
router.get('/all/:coordinate_id', controller.GetPostComments)
router.post('/add/:post_id', controller.AddComment)

module.exports = router
