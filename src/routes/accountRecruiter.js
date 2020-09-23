const { Router } = require('express')

const router = Router()

const { registerAccount, getAccount, getAccountById, updateAccount, updatePatchAccount, deleteAccount } = require('../controllers/accountRecruiter')

router.post('/register', registerAccount)
router.get('/', getAccount)
router.get('/:id', getAccountById)
router.put('/:id', updateAccount)
router.patch('/:id', updatePatchAccount)
router.delete('/:id', deleteAccount)

module.exports = router
