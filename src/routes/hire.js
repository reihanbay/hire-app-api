const { Router } = require('express')

const router = Router()
const { getDataHire, getDataHireById, createHire, updateHire, updatePatchHire, deleteHire } = require('../controllers/hire')
const { authRecruiter } = require('../middleware/auth')

router.post('/', authRecruiter, createHire)
router.get('/', getDataHire)
router.get('/:id', getDataHireById)
router.put('/:id', authRecruiter, updateHire)
router.patch('/:id', authRecruiter, updatePatchHire)
router.delete('/:id', authRecruiter, deleteHire)

module.exports = router
