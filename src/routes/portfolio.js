const { Router } = require('express')

const router = Router()
const { getDataPortfolio, getDataPortfolioById, createPortfolio, updatePortfolio, updatePatchPortfolio, deletePortfolio } = require('../controllers/portfolio')
const uploadImage = require('../middleware/multer')
const { authWorker, authRecruiter } = require('../middleware/auth')

router.post('/', authWorker, uploadImage, createPortfolio)
router.get('/', authRecruiter, authWorker, getDataPortfolio)
router.get('/:id', authRecruiter, authWorker, getDataPortfolioById)
router.put('/:id', authWorker, uploadImage, updatePortfolio)
router.patch('/:id', authWorker, uploadImage, updatePatchPortfolio)
router.delete('/:id', authWorker, deletePortfolio)

module.exports = router
