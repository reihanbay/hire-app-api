const { Router } = require('express')

const router = Router()

const { getAccount, getAccountById, updateAccount, updatePatchAccount, deleteAccount, registerAccount, loginAccount } = require('../controllers/accountWorkers')
const { authWorker } = require('../middleware/auth')

router.post('/register', registerAccount)
router.post('/login', loginAccount)
router.get('/', authWorker, getAccount)
router.get('/:id', authWorker, getAccountById)
router.put('/:id', authWorker, updateAccount)
router.patch('/:id', authWorker, updatePatchAccount)
router.delete('/:id', deleteAccount)

module.exports = router
