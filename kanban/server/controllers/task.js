const { Task, User } = require('../models')
const createError = require('http-errors')
class ContorllerTask {
  static getAll(req, res, next) {
    let UserId = req.user.id
    Task
      .findAll({ where: { UserId }, order: [['updatedAt', 'DESC']], include: [{ model: User }] })
      .then(allTask => {
        res.status(200).json(allTask)
      })
      .catch(err => {
        next(err)
      })
  }

  static addTask(req, res, next) {
    let { title, description, status } = req.body
    let UserId = req.user.id
    let category = 'backlog'
    Task
      .create({ title, description, status, category, UserId })
      .then(newTask => {
        res.status(200).json(newTask)
      })
      .catch(err => {
        next(err)
      })
  }

  static getOneTask(req, res, next) {
    let id = req.params.id
    Task
      .findOne({ where: { id } })
      .then(oneTask => {
        if (!oneTask) {
          throw createError(404, 'Not Found')
        } else {
          res.status(200).json(oneTask)
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static updateTask(req, res, next) {
    let id = req.params.id
    let { title, description } = req.body
    Task
      .update({ title, description }, { where: { id }, returning: true })
      .then(resultUpdate => {
        if (resultUpdate[0]) {
          res.status(201).json(resultUpdate[1])
        } else {
          throw createError(404, 'Not Found')
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static updateOneTask(req, res, next) {
    let id = req.params.id
    let { category } = req.body
    Task
      .update({ category }, { where: { id }, returning: true })
      .then(result => {
        if (result[0]) {
          res.status(201).json(result[1])
        } else {
          throw createError(404, 'Not Found')
        }
      })
      .catch(err => {
        next(err)
      })

  }


  static deleteTask(req, res, next) {
    let id = req.params.id
    let valueFindOne = null
    Task
      .findOne({ where: { id } })
      .then(result => {
        valueFindOne = result
        return Task.destroy({ where: { id }, returning: true })
      })
      .then(resultDestroy => {
        if (resultDestroy > 0) {

          res.status(200).json(valueFindOne)
        } else {
          throw createError(404, 'Not Found')
        }
      })
      .catch(err => {
        next(err)
      })
  }


}

module.exports = ContorllerTask