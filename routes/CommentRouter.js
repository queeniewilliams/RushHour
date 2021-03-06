const router = require('express').Router()
const controller = require('../controllers/CommentController')
const middleware = require('../middleware')
router.get('/all/:coordinate_id', controller.GetAllComments)
router.post('/add/:coordinate_id', controller.AddComment)
router.delete('/:comment_id', controller.DeleteComment)
router.put('/like/:comment_id', controller.LikeComment)

module.exports = router
