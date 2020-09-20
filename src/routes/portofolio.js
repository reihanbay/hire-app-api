const { Router } = require('express')

const router = Router()
const { getDataPortofolio, getDataPortofolioById, createPortofolio, updatePortofolio, updatePatchPortofolio, deletePortofolio } = require('../controllers/portofolio')

router.post('/', createPortofolio)
router.get('/', getDataPortofolio)
router.get('/:id', getDataPortofolioById)
router.put('/:id', updatePortofolio)
router.patch('/:id', updatePatchPortofolio)
router.delete('/:id', deletePortofolio)

module.exports = router
