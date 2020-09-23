const { Router } = require('express')

const router = Router()
const { getDataProject, getDataProjectById, createProject, updateProject, updatePatchProject, deleteProject } = require('../controllers/projects')
const { authWorker } = require('../middleware/auth')
const uploadImage = require('../middleware/multer')

router.post('/', uploadImage, createProject)
router.get('/', authWorker, getDataProject)
router.get('/:id', getDataProjectById)
router.put('/:id', updateProject)
router.patch('/:id', updatePatchProject)
router.delete('/:id', deleteProject)

module.exports = router
