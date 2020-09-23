const { getAccountModel, checkEmailModel, getAccountByIdModel, updateAccountModel, updatePatchAccountModel, deleteAccountModel, selectAccountModel, updatedAtDate, postAccount, loginAccountModel } = require('../models/accountWorkers')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {

  registerAccount: async (req, res) => {
    const { name, email, password, noHp } = req.body
    if (name && email && password && noHp) {
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(password, salt)
      const setData = {
        name,
        email,
        password: encryptPassword,
        noHp,
        status: 0
      }
      try {
        const checkEmail = await checkEmailModel(email)
        if (checkEmail.length > 0) {
          res.send({
            success: false,
            message: 'Email Already Registered'
          })
        } else {
          const result = await postAccount(setData)
          console.log(result)
          res.send({
            success: true,
            message: 'Register Account Success!',
            data: result
          })
        }
      } catch (err) {
        console.log(err)
        res.send({
          success: false,
          message: 'Bad Request'
        })
      }
    } else {
      res.send({
        success: false,
        message: 'Field must be filled!'
      })
    }
  },

  loginAccount: async (req, res) => {
    try {
      const { email, password } = req.body
      const checkData = await loginAccountModel(email)
      if (checkData.length >= 1) {
        const checkPassword = bcrypt.compareSync(
          password, checkData[0].password)
        if (checkPassword) {
          const { idAccount, name, email, status } = checkData[0]
          let payload = { idAccount, name, email, status }
          const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' })
          payload = { ...payload, token }
          res.send({
            success: true,
            message: 'Success Login',
            data: payload
          })
        } else {
          res.send({
            success: false,
            message: 'Wrong Password'
          })
        }
      } else {
        res.send({
          success: false,
          message: 'Email not registered'
        })
      }
    } catch (err) {
      console.log(err)
      res.send({
        success: false,
        message: 'Bad Request'
      })
    }
  },

  getAccount: (req, res) => {
    console.log(req.query)
    let { page, limit, search } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'name'
      searchValue = search || ''
    }

    if (!limit) {
      limit = 9
    } else {
      limit = parseInt(limit) // menghindari inputan yang bukan string
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const offset = (page - 1) * limit

    getAccountModel(searchKey, searchValue, limit, offset, result => {
      console.log(searchKey, searchValue)
      if (result.length) { // result itu berupa Array
        res.send({
          success: true,
          messages: 'list Worker',
          data: result // result = hasil dari yang diambil dari parameter result
        })
      } else {
        res.send({
          success: true,
          messages: 'There is no worker on list'
        })
      }
    })
  },
  getAccountById: (req, res) => {
    const { id } = req.params
    getAccountByIdModel(id, result => {
      if (result.length) {
        res.send({
          success: true,
          message: `Data Account ${id}`,
          data: result[0]
        })
      } else {
        res.send({
          success: false,
          message: `Data Account ${id} not found`
        })
      }
    })
  },
  updateAccount: (req, res) => {
    const id = req.params.id
    const { name, email, password, noHp } = req.body
    if (name.trim() && email.trim() && password.trim() && noHp.trim()) {
      updateAccountModel([name, email, password, noHp], id, result => {
        updatedAtDate(id)
        console.log(result)
        if (result.affectedRows) {
          res.send({
            success: true,
            messages: `Account with id ${id} Has Been Updated`
          })
        } else {
          res.send({
            success: false,
            messages: 'Field must be filled'
          })
        }
      })
    } else {
      res.send({
        success: false,
        messages: 'error!'
      })
    }
  },
  updatePatchAccount: (req, res) => {
    const id = req.params.id
    const { name = '', email = '', password = '', noHp = '' } = req.body
    if (name.trim() || email.trim() || password.trim() || noHp.trim()) {
      selectAccountModel(id, result => {
        const data = Object.entries(req.body).map(item => {
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        if (result.length) {
          updatePatchAccountModel(data, id, result => {
            updatedAtDate(id)
            if (result.affectedRows) {
              res.send({
                success: true,
                messages: `Account With id ${id} has been Updated`
              })
            } else {
              res.send({
                success: false,
                messages: 'Failed to Update'
              })
            }
          })
        } else {
          res.send({
            success: false,
            messages: 'Data Project Not Found'
          })
        }
      })
    } else {
      res.send({
        success: false,
        message: 'ERROR!'
      })
    }
  },

  deleteAccount: (req, res) => {
    const { id } = req.params

    selectAccountModel(id, result => {
      if (result.length) {
        deleteAccountModel(id, result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `Account with id ${id} has been deleted`
            })
          } else {
            res.send({
              success: false,
              message: 'Failed to delete!'
            })
          }
        })
      } else {
        res.send({
          success: false,
          message: 'Data Worker Not Found'
        })
      }
    })
  }
}
