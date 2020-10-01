const { Router } = require('express')

const router = Router()
const { getDataSkill, getDataSkillById, createSkill, updateSkill, updatePatchSkill, deleteSkill } = require('../controllers/skill')
const { authWorker, authAll } = require('../middleware/auth')

router.post('/', authWorker, createSkill)
router.get('/', authAll, getDataSkill)
router.get('/:id', authAll, getDataSkillById)
router.put('/:id', authWorker, updateSkill)
router.patch('/:id', authWorker, updatePatchSkill)
router.delete('/:id', authWorker, deleteSkill)

module.exports = router
