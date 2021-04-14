const { Comment, User } = require('../models')

const GetPostComments = async (req, res) => {
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
    // const { token } = res.locals
    const comment = await Comment.create({
      ...req.body,
      userId: 1,
      coordinateId: req.params.coordinate_id
    })
    res.send(comment)
  } catch (error) {
    throw error
  }
}
const DeleteComment = async (req, res) => {
  try {
    await Comment.destroy({ where: { id: req.params.coordinate_id } })
    res.send({
      msg: 'Comment Deleted',
      payload: req.params.coordinate_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}
module.exports = {
  GetPostComments,
  AddComment,
  DeleteComment
}
