const { Router } = require('express')

const router = Router()

const { createWorker, getWorker, getWorkerById, updateWorker, updatePatchWorker, deleteWorker } = require('../controllers/worker')

router.post('/:id', createWorker)
router.get('/', getWorker)
router.get('/:id', getWorkerById)
router.put('/:id', updateWorker)
router.patch('/:id', updatePatchWorker)
router.delete('/:id', deleteWorker)

module.exports = router
