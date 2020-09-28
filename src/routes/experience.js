const { Router } = require('express')

const router = Router()
const { getDataExperience, getDataExperienceById, createExperience, updateExperience, updatePatchExperience, deleteExperience } = require('../controllers/experience')
const { authWorker, authRecruiter } = require('../middleware/auth')

router.post('/', authWorker, createExperience)
router.get('/', authWorker, authRecruiter, getDataExperience)
router.get('/:id', authWorker, authRecruiter, getDataExperienceById)
router.put('/:id', authWorker, updateExperience)
router.patch('/:id', authWorker, updatePatchExperience)
router.delete('/:id', authWorker, deleteExperience)

module.exports = router
