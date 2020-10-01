const { Router } = require('express')
const router = Router()

const { createRecruiter, getRecruiter, getRecruiterById, updateRecruiter, updatePatchRecruiter, deleteRecruiter } = require('../controllers/recruiter')
const uploadImage = require('../middleware/multer')
const { authRecruiter } = require('../middleware/auth')

router.post('/', authRecruiter, uploadImage, createRecruiter)
router.get('/', authRecruiter, getRecruiter)
router.get('/:id', authRecruiter, getRecruiterById)
router.put('/:id', authRecruiter, uploadImage, updateRecruiter)
router.patch('/:id', authRecruiter, uploadImage, updatePatchRecruiter)
router.delete('/:id', authRecruiter, deleteRecruiter)

module.exports = router
