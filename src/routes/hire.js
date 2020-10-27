const { Router } = require('express')

const router = Router()
const { getDataHire, getDataHireById, createHire, updateHire, updatePatchHire, deleteHire } = require('../controllers/hire')
const { authRecruiter, authAll } = require('../middleware/auth')

router.post('/', authRecruiter, createHire)
router.get('/', authAll, getDataHire)
router.get('/:id', authAll, getDataHireById)
router.put('/:id', authAll, updateHire)
router.patch('/:id', authAll, updatePatchHire)
router.delete('/:id', authRecruiter, deleteHire)

module.exports = router
