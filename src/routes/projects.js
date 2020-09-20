const { Router } = require('express')

const router = Router()
const { getDataProject, getDataProjectById, createProject, updateProject, updatePatchProject, deleteProject } = require('../controllers/projects')

router.post('/', createProject)
router.get('/', getDataProject)
router.get('/:id', getDataProjectById)
router.put('/:id', updateProject)
router.patch('/:id', updatePatchProject)
router.delete('/:id', deleteProject)

module.exports = router
