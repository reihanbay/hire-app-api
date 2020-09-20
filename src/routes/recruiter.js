const { Router } = require('express')
const router = Router()

const { createRecruiter, getRecruiter, getRecruiterById, updateRecruiter, updatePatchRecruiter, deleteRecruiter } = require('../controllers/recruiter')

router.post('/:id', createRecruiter)
router.get('/', getRecruiter)
router.get('/:id', getRecruiterById)
router.put('/:id', updateRecruiter)
router.patch('/:id', updatePatchRecruiter)
router.delete('/:id', deleteRecruiter)

module.exports = router
