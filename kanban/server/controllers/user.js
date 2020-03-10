const { User } = require('../models')
const { generatingJWT, veryfingJWT } = require('../helper/jwt')
const { hashingPassword, verifyingPassword } = require('../helper/bcrypt')
const createError = require('http-errors')
class ControllerUser {
  static register(req, res, next) {
    let { username, email, password } = req.body
    User
      .create({ username, email, password })
      .then(user => {
        let payload = { id: user.id, email }
        let token = generatingJWT(payload)
        res.status(201).json(token)
      })
      .catch(err => {
        next(err)
      })
  }


  static login(req, res, next) {
    let { email, password } = req.body
    User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          throw createError(400, 'Your email or password is incorrect')
        } else {
          if (verifyingPassword(password, user.password)) {
            let payload = { id: user.id, email: user.email }
            let token = generatingJWT(payload)
            res.status(201).json(token)
          }
          else {
            throw createError(400, 'Your email or password is incorrect')
          }
        }
      })
      .catch(err => {
        // next(err)
        res.send(err)
      })
  }
}


module.exports = ControllerUser