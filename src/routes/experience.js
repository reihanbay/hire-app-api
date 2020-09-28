const { Router } = require('express')

const router = Router()
const { getDataExperience, getDataExperienceById, createExperience, updateExperience, updatePatchExperience, deleteExperience } = require('../controllers/experience')
const { authWorker } = require('../middleware/auth')

router.post('/', authWorker, createExperience)
router.get('/', getDataExperience)
router.get('/:id', getDataExperienceById)
router.put('/:id', authWorker, updateExperience)
router.patch('/:id', authWorker, updatePatchExperience)
router.delete('/:id', authWorker, deleteExperience)

module.exports = router
