const { Comment, User } = require('../models')

const GetPostComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { coordinateId: req.params.coordinate_id },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'commenter',
          attributes: ['id']
        }
      ]
    })
    res.send(comments)
  } catch (error) {
    throw error
  }
}
const AddComment = async (req, res) => {
  try {
    const { token } = res.locals
    const comment = await Comment.create({
      ...req.body,
      userId: token.id,
      coordinateId: req.params.coordinate_id
    })
    res.send(comment)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetPostComments,
  AddComment
}
