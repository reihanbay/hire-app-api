const jwt = require('jsonwebtoken')
require('dotenv').config()
const worker = 'worker'
const recruiter = 'recruiter'

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
          console.log(result)
          if (result.role === recruiter) {
            res.send({
              success: false,
              message: 'Access Denied'
            })
          } else {
            next()
          }
        }
      })
    } else {
      res.status(400).send({
        success: false,
        message: 'Please Login First'
      })
    }
  },

  authRecruiter: (req, res, next) => {
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
          if (result.role === worker) {
            res.send({
              success: false,
              message: 'Access Denied!'
            })
          } else {
            next()
          }
        }
      })
    } else {
      res.status(400).send({
        success: false,
        message: 'Please Login First'
      })
    }
  },
  authAll: (req, res, next) => {
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
