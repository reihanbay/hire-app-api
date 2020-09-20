const { Router } = require('express')

const router = Router()
const { getDataHire, getDataHireById, createHire, updateHire, updatePatchHire, deleteHire } = require('../controllers/hire')

router.post('/', createHire)
router.get('/', getDataHire)
router.get('/:id', getDataHireById)
router.put('/:id', updateHire)
router.patch('/:id', updatePatchHire)
router.delete('/:id', deleteHire)

module.exports = router
