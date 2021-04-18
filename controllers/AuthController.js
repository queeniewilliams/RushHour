const { User } = require('../models')
const { HashPassword, ComparePassword, CreateToken } = require('../middleware')

const Register = async (req, res) => {
  try {
    let { email, name, profile } = req.body
    let passwordDigest = await HashPassword(req.body.passwordDigest)
    const user = await User.create({
      email,
      name,
      passwordDigest,
      profile
    })
    res.send(user)
  } catch (error) {
    throw error
  }
}
const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      raw: true
    })
    if (
      user &&
      (await ComparePassword(req.body.password, user.passwordDigest))
    ) {
      let payload = {
        id: user.id,
        email: user.email
      }
      let token = CreateToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    res.status(401).send({ status: 'Error', msg: 'INTRUDER' })
  }
}
const GetAllUsers = async (req, res) => {
  try {
    let users = await User.findAll()
    res.send(users)
  } catch (error) {
    throw error
  }
}

const GetCurrentUser = async (req, res) => {
  try {
    res.send(res.locals.token)
  } catch (error) {
    throw error
  }
}
const GetProfile = async (req, res) => {
  try {
    const profile = await User.findOne({
      where: { id: req.params.user_id }
    })
    res.send(profile)
  } catch (error) {
    throw error
  }
}
module.exports = {
  Register,
  Login,
  GetAllUsers,
  GetCurrentUser,
  GetProfile
}
