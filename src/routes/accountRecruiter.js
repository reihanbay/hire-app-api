const { Router } = require('express')

const router = Router()

const { loginAccount, registerAccount, getAccount, getAccountById, updateAccount, updatePatchAccount, deleteAccount } = require('../controllers/accountRecruiter')
const { authRecruiter } = require('../middleware/auth')

router.post('/login', loginAccount)
router.post('/register', registerAccount)
router.get('/', authRecruiter, getAccount)
router.get('/:id', authRecruiter, getAccountById)
router.put('/:id', authRecruiter, updateAccount)
router.patch('/:id', authRecruiter, updatePatchAccount)
router.delete('/:id', deleteAccount)

module.exports = router
