const { Router } = require('express')

const router = Router()
const { getDataExperience, getDataExperienceById, createExperience, updateExperience, updatePatchExperience, deleteExperience } = require('../controllers/experience')

router.post('/', createExperience)
router.get('/', getDataExperience)
router.get('/:id', getDataExperienceById)
router.put('/:id', updateExperience)
router.patch('/:id', updatePatchExperience)
router.delete('/:id', deleteExperience)

module.exports = router
