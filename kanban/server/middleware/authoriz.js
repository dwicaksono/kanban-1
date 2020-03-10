const { User, Task } = require('../models')
const createError = require('http-errors')

module.exports = (req, res, next) => {
  let UserId = req.user.id
  let id = req.params.id
  Task
    .findOne({ where: { id } })
    .then(result => {
      if (!result) {
        throw createError(404, 'not found')
      } else {
        if (result.UserId === UserId) {
          next()
        } else {
          throw createError(403, 'Forbidden')
        }
      }
    })
    .catch(next)

}