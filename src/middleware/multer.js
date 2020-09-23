const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/')
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  }
})
const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    callback(null, true)
  } else {
    callback(new Error('File must be JPG or PNG'), false)
  }
}

const limits = { filesize: 1024 * 1024 * 1 }
const upload = multer({ storage, fileFilter, limits }).single('image')

const uploadFilter = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.status(400).send({
        success: false,
        message: err.message
      })
    } else if (err) {
      res.status(400).send({
        success: false,
        message: err.message
      })
    }
    next()
  })
}

module.exports = uploadFilter
