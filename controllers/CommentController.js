const { Comment, User } = require('../models')

const GetAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { coordinateId: req.params.coordinate_id },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'commenter'
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
    const userId = 1
    // const { token } = res.locals
    const comment = await Comment.create({
      ...req.body,
      userId,
      coordinateId: req.params.coordinate_id
    })
    res.send(comment)
  } catch (error) {
    throw error
  }
}

const DeleteComment = async (req, res) => {
  try {
    await Comment.destroy({ where: { id: req.params.comment_id } })
    res.send({
      msg: 'Comment Deleted',
      payload: req.params.comment_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

const LikeComment = async (req, res) => {
  try {
    const comment = await Comment.increment(
      {
        likes: 1
      },
      { where: { id: req.params.comment_id } }
    )
    res.send(comment)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetAllComments,
  AddComment,
  DeleteComment,
  LikeComment
}
