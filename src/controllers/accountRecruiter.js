const { createAccountModel, getAccountModel, getAccountByIdModel, updateAccountModel, updatePatchAccountModel, deleteAccountModel, selectAccountModel, updatedAtDate } = require('../models/accountRecruiter')

module.exports = {

  createAccount: (req, res) => {
    const { name, email, password, noHp, companyName, position } = req.body // harus sama yang diinputkan di postman
    if (name && email && password && noHp && companyName && position) {
      createAccountModel([name, email, password, noHp, companyName, position], result => {
        res.status(201).send({
          success: true,
          messages: 'Account Has Been Created',
          data: req.body
        })
      })
    } else {
      res.status(500).send({
        success: false,
        messages: 'Field must be filled'
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
          messages: 'list Project',
          data: result // result = hasil dari yang diambil dari parameter result
        })
      } else {
        res.send({
          success: true,
          messages: 'There is no item on list'
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
          message: `Data project ${id}`,
          data: result[0]
        })
      } else {
        res.send({
          success: false,
          message: `Data Project ${id} not found`
        })
      }
    })
  },
  updateAccount: (req, res) => {
    const id = req.params.id
    const { name, email, password, noHp, companyName, position } = req.body
    if (name.trim() && email.trim() && password.trim() && noHp.trim() && companyName.trim() && position.trim()) {
      updateAccountModel([name, email, password, noHp, companyName, position], id, result => {
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
    const { name = '', email = '', password = '', noHp = '', companyName = '', position = '' } = req.body
    if (name.trim() || email.trim() || password.trim() || noHp.trim() || companyName.trim() || position.trim()) {
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
            messages: 'Data Account Not Found'
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
          message: 'Data Project Not Found'
        })
      }
    })
  }
}
