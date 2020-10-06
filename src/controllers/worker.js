const { createWorkerModel, checkIdAccountModel, searchWorkerModel, getWorkerByIdModel, updateWorkerModel, updatePatchWorkerModel, deleteWorkerModel, selectWorkerModel, updatedAtDate } = require('../models/worker')

module.exports = {

  createWorker: async (req, res) => {
    const { nameWorker, jobTitle, statusJob, city, workPlace, description, idAccount } = req.body
    const image = req.file === undefined ? '' : req.file.filename
    if (nameWorker && jobTitle && statusJob && city && workPlace && description && idAccount && image) {
      const setData = {
        nameWorker,
        jobTitle,
        statusJob,
        city,
        workPlace,
        description,
        idAccount,
        image
      }
      try {
        const checkId = await checkIdAccountModel(idAccount)
        console.log(checkId.length)
        if (checkId.length === 0) {
          const create = await createWorkerModel(setData)
          console.log(create)
          res.send({
            success: true,
            message: 'Create Profile Success',
            data: setData
          })
        } else {
          res.send({
            success: false,
            message: 'Id already created'
          })
        }
      } catch (err) {
        res.send({
          success: false,
          message: 'Bad Request'
        })
      }
    } else {
      res.status(500).send({
        success: false,
        messages: 'Field must be filled'
      })
    }
  },

  getWorker: async (req, res) => {
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
      limit = 3
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const offset = (page - 1) * limit

    try {
      const result = await searchWorkerModel(searchKey, searchValue, limit, offset, sort, order)
      if (result.length) {
        res.send({
          success: true,
          messages: 'list worker',
          data: result
        })
      } else {
        res.send({
          success: false,
          messages: 'There is no worker on list'
        })
      }
    } catch (err) {
      res.send({
        success: false,
        messages: 'Bad Request!'
      })
    }
  },

  getWorkerById: async (req, res) => {
    const { id } = req.params
    try {
      const result = await getWorkerByIdModel(id)
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
    } catch (err) {
      res.send({
        success: false,
        message: err.message
      })
    }
  },

  updateWorker: async (req, res) => {
    const id = req.params.id
    const { nameWorker, jobTitle, statusJob, city, workPlace, description } = req.body
    const image = req.file === undefined ? '' : req.file.filename
    if (nameWorker.trim() && jobTitle.trim() && statusJob.trim() && city.trim() && workPlace.trim() && description.trim() && image.trim()) {
      try {
        const select = await selectWorkerModel(id)
        if (select.length) {
          const result = await updateWorkerModel([nameWorker, jobTitle, statusJob, city, workPlace, description, image], id)
          if (result.affectedRows) {
            res.send({
              success: true,
              messages: `Account with id ${id} Has Been Updated`
            })
          } else {
            res.send({
              success: false,
              messages: 'Failed to update account'
            })
          }
        } else {
          res.send({
            success: false,
            message: 'Id not found'
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

  updatePatchWorker: async (req, res) => {
    const id = req.params.id
    const { nameWorker = '', jobTitle = '', statusJob = '', city = '', workPlace = '', description = '' } = req.body
    const image = req.file === undefined ? '' : req.file.filename
    if (nameWorker.trim() || jobTitle.trim() || statusJob.trim() || city.trim() || city.trim() || workPlace.trim() || description.trim() || image.trim()) {
      const setData = {
        ...req.body,
        image
      }
      const data = Object.entries(setData).map(item => {
        return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
      })

      try {
        const select = await selectWorkerModel(id)
        if (select.length) {
          const result = await updatePatchWorkerModel(data, id)
          if (result.affectedRows) {
            updatedAtDate(id)
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
            messages: 'Data worker Not Found'
          })
        }
      } catch (err) {
        res.send({
          success: false,
          message: 'Bad Request!'
        })
      }
    } else {
      res.send({
        success: false,
        message: 'Field must be filled!'
      })
    }
  },

  deleteWorker: async (req, res) => {
    const { id } = req.params
    try {
      const select = await selectWorkerModel(id)
      const result = await deleteWorkerModel(id)
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
          message: 'Data worker Not Found'
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
