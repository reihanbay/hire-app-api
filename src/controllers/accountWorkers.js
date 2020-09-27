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
    const { email, password } = req.body
    try {
      const checkData = await loginAccountModel(email)
      if (checkData.length >= 1) {
        const checkPassword = bcrypt.compareSync(
          password, checkData[0].password)
        if (checkPassword) {
          const { idAccount, name, email, status } = checkData[0]
          let payload = { idAccount, name, email, status }
          const token = jwt.sign(payload, process.env.JWT_KEY_WORKER, { expiresIn: '1h' })
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

  getAccount: async (req, res) => {
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
    try {
      const result = await getAccountModel(searchKey, searchValue, limit, offset)
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
    } catch (err) {
      res.send({
        success: false,
        message: 'Bad Request'
      })
    }
  },

  getAccountById: async (req, res) => {
    const { id } = req.params
    try {
      const result = await getAccountByIdModel(id)
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
    } catch (err) {
      res.send({
        success: false,
        message: 'Bad Request'
      })
    }
  },

  updateAccount: async (req, res) => {
    const id = req.params.id
    let { name, email, password, noHp } = req.body
    const salt = bcrypt.genSaltSync(10)
    const encryptPassword = bcrypt.hashSync(password, salt)
    password = encryptPassword
    if (name.trim() && email.trim() && password.trim() && noHp.trim()) {
      try {
        const select = await selectAccountModel(id)
        if (select.length) {
          const result = await updateAccountModel([name, email, password, noHp], id)
          console.log(result)
          updatedAtDate(id)
          res.send({
            success: true,
            messages: `Account with id ${id} Has Been Updated`
          })
        } else {
          res.send({
            success: false,
            message: `Account id ${id} not found`
          })
        }
      } catch (err) {
        res.send({
          success: false,
          messages: 'Bad Request'
        })
      }
    } else {
      res.send({
        success: false,
        messages: 'Field must be filled'
      })
    }
  },

  updatePatchAccount: async (req, res) => {
    const id = req.params.id
    const { name = '', email = '', password = '', noHp = '' } = req.body
    const salt = bcrypt.genSaltSync(10)
    const encryptPassword = bcrypt.hashSync(password, salt)
    if (name.trim() || email.trim() || password.trim() || noHp.trim()) {
      const setData = {
        ...req.body,
        password: encryptPassword
      }
      const data = Object.entries(setData).map(item => {
        return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
      })
      try {
        const select = await selectAccountModel(id)
        if (select.length) {
          const result = await updatePatchAccountModel(data, id)
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
        } else {
          res.send({
            success: false,
            messages: 'Data Account Not Found'
          })
        }
      } catch (err) {
        res.send({
          success: false,
          message: 'Bad Request'
        })
      }
    } else {
      res.send({
        success: false,
        message: 'Fields is empty'
      })
    }
  },

  deleteAccount: async (req, res) => {
    const { id } = req.params
    try {
      const select = await selectAccountModel(id)
      const result = await deleteAccountModel(id)
      if (select.length) {
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
      } else {
        res.send({
          success: false,
          message: 'Data Worker Not Found'
        })
      }
    } catch (err) {
      res.send({
        success: false,
        message: 'Bad Request'
      })
    }
  }
}
