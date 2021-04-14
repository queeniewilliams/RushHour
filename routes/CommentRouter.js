const router = require('express').Router()
const controller = require('../controllers/commentController')
router.get('/all/:coordinate_id', controller.GetPostComments)
router.put('/dislike/:comment_id', controller.DislikeComment)
router.post('/add/:post_id', StripHeaders, VerifyToken, controller.AddComment)
router.put('/like/:comment_id', controller.LikeComment)

module.exports = router
