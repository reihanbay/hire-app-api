const { Router } = require('express')

const router = Router()
const { getDataHire, getDataHireById, createHire, updateHire, updatePatchHire, deleteHire } = require('../controllers/hire')
const { authRecruiter, authAll } = require('../middleware/auth')

router.post('/', authRecruiter, createHire)
router.get('/', authAll, getDataHire)
router.get('/:id', authAll, getDataHireById)
router.put('/:id', authRecruiter, updateHire)
router.patch('/:id', authRecruiter, updatePatchHire)
router.delete('/:id', authRecruiter, deleteHire)

module.exports = router
