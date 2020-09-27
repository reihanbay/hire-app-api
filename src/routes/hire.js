const { Router } = require('express')

const router = Router()
const { getDataHire, getDataHireById, createHire, updateHire, updatePatchHire, deleteHire } = require('../controllers/hire')
const { authWorker, authRecruiter } = require('../middleware/auth')

router.post('/', authRecruiter, createHire)
router.get('/', authRecruiter, authWorker, getDataHire)
router.get('/:id', authRecruiter, authWorker, getDataHireById)
router.put('/:id', authRecruiter, updateHire)
router.patch('/:id', authRecruiter, updatePatchHire)
router.delete('/:id', authRecruiter, deleteHire)

module.exports = router
