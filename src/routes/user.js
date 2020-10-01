const { Router } = require('express')

const router = Router()

const { getAccount, getAccountById, updateAccount, updatePatchAccount, deleteAccount, registerAccount, loginAccount } = require('../controllers/user')
const { authAll } = require('../middleware/auth')

router.post('/register', registerAccount)
router.post('/login', loginAccount)
router.get('/', authAll, getAccount)
router.get('/:id', authAll, getAccountById)
router.put('/:id', authAll, updateAccount)
router.patch('/:id', authAll, updatePatchAccount)
router.delete('/:id', authAll, deleteAccount)

module.exports = router
