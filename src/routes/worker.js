const { Router } = require('express')
const router = Router()

const { createWorker, getWorker, getWorkerById, updateWorker, updatePatchWorker, deleteWorker } = require('../controllers/worker')
const uploadImage = require('../middleware/multer')
const { authWorker, authAll } = require('../middleware/auth')

router.post('/', authWorker, uploadImage, createWorker)
router.get('/', authAll, getWorker)
router.get('/:id', authAll, getWorkerById)
router.put('/:id', authWorker, uploadImage, updateWorker)
router.patch('/:id', authWorker, uploadImage, updatePatchWorker)
router.delete('/:id', authWorker, deleteWorker)

module.exports = router
