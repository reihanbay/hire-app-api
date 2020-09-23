const { createHireModel, getHireModel, getHireByIdModel, updateHireModel, updatePatchHireModel, deleteHireModel, selectHireModel, updatedAtDate } = require('../models/hire')

module.exports = {

  createHire: (req, res) => {
    const { projectJob, message, statusConfirm, dateConfirm, price, idWorker, idProject } = req.body // harus sama yang diinputkan di postman
    if (projectJob && message && statusConfirm && dateConfirm && price && idWorker && idProject) {
      createHireModel([projectJob, message, statusConfirm, dateConfirm, price, idWorker, idProject], result => {
        console.log(result)
        res.status(201).send({
          success: true,
          messages: 'Hire Has Been Created',
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

  getDataHire: (req, res) => {
    let { page, limit, search } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'idHire'
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

    getHireModel(searchKey, searchValue, limit, offset, result => {
      console.log(result)
      if (result.length) { // result itu berupa Array
        res.send({
          success: true,
          messages: 'list Hire',
          data: result // result = hasil dari yang diambil dari parameter result
        })
      } else {
        res.send({
          success: true,
          messages: 'There is no hire on list'
        })
      }
    })
  },
  getDataHireById: (req, res) => {
    const { id } = req.params
    getHireByIdModel(id, result => {
      if (result.length) {
        res.send({
          success: true,
          message: `Data Hire ${id}`,
          data: result[0]
        })
      } else {
        res.send({
          success: false,
          message: `Data Hire ${id} not found`
        })
      }
    })
  },
  updateHire: (req, res) => {
    const id = req.params.id
    const { projectJob, message, statusConfirm, dateConfirm, price, idWorker, idProject } = req.body
    if (projectJob.trim() && message.trim() && statusConfirm.trim() && dateConfirm.trim() && price.trim() && idWorker.trim() && idProject.trim()) {
      updateHireModel([projectJob, message, statusConfirm, dateConfirm, price, idWorker, idProject], id, result => {
        updatedAtDate(id)
        console.log(result)
        if (result.affectedRows) {
          res.send({
            success: true,
            messages: `Hire with id ${id} Has Been Updated`
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
  updatePatchHire: (req, res) => {
    const id = req.params.id
    const { projectJob = '', message = '', statusConfirm = '', dateConfirm = '', price = '', idWorker = '', idProject = '' } = req.body
    if (projectJob.trim() || message.trim() || statusConfirm.trim() || dateConfirm.trim() || price.trim() || idWorker.trim() || idProject.trim()) {
      selectHireModel(id, result => {
        const data = Object.entries(req.body).map(item => {
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        if (result.length) {
          updatePatchHireModel(data, id, result => {
            updatedAtDate(id)
            if (result.affectedRows) {
              res.send({
                success: true,
                messages: `Hire With id ${id} has been Updated`
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
            messages: 'Data Hire Not Found'
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

  deleteHire: (req, res) => {
    const { id } = req.params

    selectHireModel(id, result => {
      if (result.length) {
        deleteHireModel(id, result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `Hire with id ${id} has been deleted`
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
