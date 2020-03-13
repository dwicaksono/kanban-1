const { User } = require('../models')
const { generatingJWT, veryfingJWT } = require('../helper/jwt')
const { hashingPassword, verifyingPassword } = require('../helper/bcrypt')
const { OAuth2Client } = require('google-auth-library')
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

  static googleLogin(req, res, next) {
    let payload
    const client = new OAuth2Client(process.env.GOOGLE_ID)
    // console.log(req.body.token)
    client.verifyIdToken({
      idToken: req.body.token.id_token,
      audience: process.env.GOOGLE_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })
      .then(ticket => {
        payload = ticket.getPayload()
        // const userid = payload['sub']
        return User
          .findOne({
            where: {
              email: payload.email
            }
          })
          .then(result => {
            if (result) {
              // const token = jwt.sign({ email: result.email, id: result.id }, process.env.JWT)
              let payload = { email: result.email, id: result.id }
              const token = generatingJWT(payload)
              res.status(201).json(token)
            } else {
              User
                .create({
                  username: payload.given_name,
                  email: payload.email,
                  password: process.env.DEFAULT_PASS
                })
                .then(newUser => {
                  // console.log(newUser, '<<<<<<<<< backend')
                  let payload = { email: newUser.email, id: newUser.id }
                  const token = generatingJWT(payload)
                  res.status(201).json(token)
                })
            }
          })
      })
      .catch(err => {
        next(err)
      })
  }
}


module.exports = ControllerUser