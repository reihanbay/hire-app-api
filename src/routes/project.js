const { Router } = require('express')

const router = Router()
const { getDataProject, getDataProjectByID, createProject, updateProject, patchProject, deleteProject } = require('../controllers/project')

router.post('/', createProject)
router.get('/', getDataProject)
router.get('/:id', getDataProjectByID)
router.put('/:id', updateProject)
router.patch('/:id', patchProject)
router.delete('/:id', deleteProject)

module.exports = router
