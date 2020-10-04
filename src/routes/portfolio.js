const { Router } = require('express')

const router = Router()
const { getDataPortfolio, getDataPortfolioById, createPortfolio, updatePortfolio, updatePatchPortfolio, deletePortfolio, getDataPortfolioByIdWorker } = require('../controllers/portfolio')
const uploadImage = require('../middleware/multer')
const { authWorker, authAll } = require('../middleware/auth')

router.post('/', authWorker, uploadImage, createPortfolio)
router.get('/', authAll, getDataPortfolio)
router.get('/:id', authAll, getDataPortfolioById)
router.get('/worker/:id', authAll, getDataPortfolioByIdWorker)
router.put('/:id', authWorker, uploadImage, updatePortfolio)
router.patch('/:id', authWorker, uploadImage, updatePatchPortfolio)
router.delete('/:id', authWorker, deletePortfolio)

module.exports = router
