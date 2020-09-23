const { Router } = require('express')

const router = Router()

const { getAccount, getAccountById, updateAccount, updatePatchAccount, deleteAccount, registerAccount, loginAccount } = require('../controllers/accountWorkers')

router.get('/', getAccount)
router.post('/register', registerAccount)
router.post('/login', loginAccount)
router.get('/:id', getAccountById)
router.put('/:id', updateAccount)
router.patch('/:id', updatePatchAccount)
router.delete('/:id', deleteAccount)

module.exports = router
