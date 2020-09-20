const { Router } = require('express')

const router = Router()
const { getDataSkill, getDataSkillById, createSkill, updateSkill, updatePatchSkill, deleteSkill } = require('../controllers/skill')

router.post('/', createSkill)
router.get('/', getDataSkill)
router.get('/:id', getDataSkillById)
router.put('/:id', updateSkill)
router.patch('/:id', updatePatchSkill)
router.delete('/:id', deleteSkill)

module.exports = router
