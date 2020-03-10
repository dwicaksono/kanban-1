const router = require('express').Router()
const ControllerTask = require('../controllers/task')
const authoriz = require('../middleware/authoriz')

router.get('/', ControllerTask.getAll)
router.post('/', ControllerTask.addTask)
router.get('/:id', authoriz, ControllerTask.getOneTask)
router.put('/:id', authoriz, ControllerTask.updateTask)
router.patch('/:id', authoriz, ControllerTask.updateOneTask)
router.delete('/:id', authoriz, ControllerTask.deleteTask)

module.exports = router