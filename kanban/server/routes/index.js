const router = require('express').Router()
const user = require('../routes/user')
const task = require('../routes/task')
const authentic = require('../middleware/authentic')

router.use('/users', user)
router.use(authentic)
router.use('/tasks', task)

module.exports = router