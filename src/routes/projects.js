const { Router } = require('express')

const router = Router()
const { getDataProject, getDataProjectById, createProject, updateProject, updatePatchProject, deleteProject } = require('../controllers/projects')
const { authWorker, authRecruiter } = require('../middleware/auth')
const uploadImage = require('../middleware/multer')

router.post('/', authRecruiter, uploadImage, createProject)
router.get('/', authRecruiter, authWorker, getDataProject)
router.get('/:id', authRecruiter, authWorker, getDataProjectById)
router.put('/:id', authRecruiter, uploadImage, updateProject)
router.patch('/:id', authRecruiter, authWorker, uploadImage, updatePatchProject)
router.delete('/:id', authRecruiter, deleteProject)

module.exports = router
