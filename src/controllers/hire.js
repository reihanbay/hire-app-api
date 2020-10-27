const { createHireModel, getHireModel, getHireByIdModel, updateHireModel, updatePatchHireModel, deleteHireModel, selectHireModel, updatedAtDate } = require('../models/hire')

module.exports = {

  createHire: async (req, res) => {
    const { projectJob, message, statusConfirm, dateConfirm, price, idWorker, idProject } = req.body // harus sama yang diinputkan di postman
    if (projectJob && message && statusConfirm && dateConfirm && price && idWorker && idProject) {
      const setData = {
        projectJob, message, statusConfirm, dateConfirm, price, idWorker, idProject
      }
      try {
        await createHireModel(setData)
        res.status(201).send({
          success: true,
          messages: 'Hire Has Been Created',
          data: req.body
        })
      } catch (err) {
        console.log(err)
        res.send({
          success: false,
          messages: 'Bad Request!'
        })
      }
    } else {
      res.status(500).send({
        success: false,
        messages: 'Field must be filled'
      })
    }
  },

  getDataHire: async (req, res) => {
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
      limit = 10
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
      const result = await getHireModel(searchKey, searchValue, limit, offset)
      if (result.length) { // result itu berupa Array
        res.send({
          success: true,
          messages: 'list Hire',
          data: result // result = hasil dari yang diambil dari parameter result
        })
      } else {
        res.send({
          success: false,
          messages: 'There is no hire on list'
        })
      }
    } catch (err) {
      res.send({
        success: false,
        messages: 'Bad Request!'
      })
    }
  },
  getDataHireById: async (req, res) => {
    const { id } = req.params
    try {
      const result = await getHireByIdModel(id)
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
    } catch (err) {
      res.send({
        success: false,
        message: 'Bad Request'
      })
    }
  },
  updateHire: async (req, res) => {
    const id = req.params.id
    const { projectJob, message, statusConfirm, dateConfirm, price } = req.body
    if (projectJob.trim() && message.trim() && statusConfirm.trim() && dateConfirm.trim() && price.trim()) {
      try {
        const select = await selectHireModel(id)
        if (select.length) {
          const result = await updateHireModel([projectJob, message, statusConfirm, dateConfirm, price], id)
          console.log(result)
          if (result.affectedRows) {
            updatedAtDate(id)
            res.send({
              success: true,
              message: `Hire with id ${id} Has Been Updated`
            })
          } else {
            res.send({
              success: false,
              messages: 'Update Hire Failed'
            })
          }
        } else {
          res.send({
            success: false,
            messages: 'The Hire not found'
          })
        }
      } catch (err) {
        console.log(err)
        res.send({
          success: false,
          message: 'Bad Request!'
        })
      }
    } else {
      res.send({
        success: false,
        messages: 'Field must be filled'
      })
    }
  },
  updatePatchHire: async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
      const select = await selectHireModel(id)
      if (select.length) {
        const result = await updatePatchHireModel(body, id)
        if (result.affectedRows) {
          updatedAtDate(id)
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
      } else {
        res.send({
          success: false,
          messages: 'The Hire not found'
        })
      }
    } catch (err) {
      res.send({
        success: false,
        message: 'Bad Request!'
      })
    }
  },

  deleteHire: async (req, res) => {
    const { id } = req.params
    try {
      const select = await selectHireModel(id)
      if (select.length) {
        const result = await deleteHireModel(id)
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
      } else {
        res.send({
          success: false,
          message: 'Data Project Not Found'
        })
      }
    } catch (err) {
      res.send({
        success: false,
        message: 'Bad Request!'
      })
    }
  }
}
