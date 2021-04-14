const { User } = require('../models')
const { HashPassword } = require('../middleware')

const Register = async (req, res) => {
  try {
    let { email } = req.body
    // let passwordDigest = await HashPassword(req.body.passwordDigest)
    const user = await User.create({
      email,
      passwordDigest
    })
    res.send(user)
  } catch (error) {
    throw error
  }
}

module.exports = {
  Register
}
