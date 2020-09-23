const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  authWorker: (req, res, next) => {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, process.env.JWT_KEY, (err, result) => {
        if ((err && err.name === 'JsonWebTokenError') || (err && err.name === 'TokenExpiredError')) {
          res.send({
            success: false,
            message: err.message
          })
        } else {
          // if (result[0].user_role === 1){
          //   next()
          // } else {
          //   res u cant access
          // }
          next()
        }
      })
    } else {
      res.status(400).send({
        success: false,
        message: 'Please Login First'
      })
    }
  }
}
