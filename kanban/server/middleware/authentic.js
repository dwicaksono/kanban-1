const { veryfingJWT } = require('../helper/jwt')
const { User } = require('../models')
const createError = require('http-errors')

module.exports = (req, res, next) => {
  const token = req.headers.token
  try {
    const user = veryfingJWT(token)
    req.user = user
    User.findOne({ where: { id: req.user.id } })
      .then(dataUser => {
        if (!dataUser) {
          throw createError(404, 'Not Found')
        } else {
          next()
        }
      })
  }
  catch (err) {
    next(err)
  }
}

