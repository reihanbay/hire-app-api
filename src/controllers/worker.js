const { createWorkerModel, searchWorkerModel, getWorkerByIdModel, updateWorkerModel, updatePatchWorkerModel, deleteWorkerModel, selectWorkerModel, updatedAtDate } = require('../models/worker')

module.exports = {

  createWorker: (req, res) => {
    const idAccount = req.params.id
    const { nameWorker, jobTitle, statusJob, city, workPlace, description, image } = req.body // harus sama yang diinputkan di postman
    if (nameWorker && jobTitle && statusJob && city && workPlace && description && image) {
      createWorkerModel([nameWorker, jobTitle, statusJob, city, workPlace, description, image], idAccount, result => {
        console.log(result)
        res.status(201).send({
          success: true,
          messages: 'Profile Has Been Created',
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

  getWorker: (req, res) => {
    console.log(req.query)
    let { order, sort, page, limit, search } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'nameWorker'
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

    searchWorkerModel(searchKey, searchValue, limit, offset, sort, order, result => {
      if (result.length) { // result itu berupa Array
        res.send({
          success: true,
          messages: 'list worker',
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
  getWorkerById: (req, res) => {
    const { id } = req.params
    getWorkerByIdModel(id, result => {
      if (result.length) {
        res.send({
          success: true,
          message: `Data Worker ${id}`,
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
  updateWorker: (req, res) => {
    const id = req.params.id
    const { nameWorker, jobTitle, statusJob, city, workPlace, description, image } = req.body
    if (nameWorker.trim() && jobTitle.trim() && statusJob.trim() && city.trim() && workPlace.trim() && description.trim() && image.trim()) {
      updateWorkerModel([nameWorker, jobTitle, statusJob, city, workPlace, description, image], id, result => {
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
  updatePatchWorker: (req, res) => {
    const id = req.params.id
    const { nameWorker = '', jobTitle = '', statusJob = '', city = '', workPlace = '', description = '', image = '' } = req.body
    if (nameWorker.trim() || jobTitle.trim() || statusJob.trim() || city.trim() || city.trim() || workPlace.trim() || description.trim() || image.trim()) {
      selectWorkerModel(id, result => {
        const data = Object.entries(req.body).map(item => {
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        if (result.length) {
          updatePatchWorkerModel(data, id, result => {
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
            messages: 'Data worker Not Found'
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

  deleteWorker: (req, res) => {
    const { id } = req.params

    selectWorkerModel(id, result => {
      if (result.length) {
        deleteWorkerModel(id, result => {
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
          message: 'Data worker Not Found'
        })
      }
    })
  }
}
