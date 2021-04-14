const router = require('express').Router()
const controller = require('../controllers/CommentController')
router.get('/all/:coordinate_id', controller.GetAllComments)
router.post('/add/:coordinate_id', controller.AddComment)
router.delete('/:coordinate_id', controller.DeleteComment)

module.exports = router
