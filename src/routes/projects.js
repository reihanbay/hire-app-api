const { Router } = require('express')

const router = Router()
const { getDataProject, getDataProjectById, createProject, updateProject, updatePatchProject, deleteProject } = require('../controllers/projects')
const { authAll, authRecruiter } = require('../middleware/auth')
const uploadImage = require('../middleware/multer')

router.post('/', authRecruiter, uploadImage, createProject)
router.get('/', authAll, getDataProject)
router.get('/:id', authAll, getDataProjectById)
router.put('/:id', authRecruiter, uploadImage, updateProject)
router.patch('/:id', authRecruiter, uploadImage, updatePatchProject)
router.delete('/:id', authRecruiter, deleteProject)

module.exports = router
