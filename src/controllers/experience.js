const { createExperienceModel, getExperienceModel, getExperienceByIdModel, updateExperienceModel, updatePatchExperienceModel, deleteExperienceModel, selectExperienceModel } = require('../models/experience')

module.exports = {

  createExperience: (req, res) => {
    const { companyName, description, workPosition, start, end, idWorker } = req.body
    if (companyName && description && workPosition && start && end && idWorker) {
      createExperienceModel([companyName, description, workPosition, start, end, idWorker], result => {
        console.log(result)
        res.status(201).send({
          success: true,
          messages: 'Experience Has Been Created',
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

  getDataExperience: (req, res) => {
    let { page, limit, search } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'idExperience'
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

    getExperienceModel(searchKey, searchValue, limit, offset, result => {
      console.log(result)
      if (result.length) { // result itu berupa Array
        res.send({
          success: true,
          messages: 'list Experience',
          data: result // result = hasil dari yang diambil dari parameter result
        })
      } else {
        res.send({
          success: true,
          messages: 'There is no Experience on list'
        })
      }
    })
  },
  getDataExperienceById: (req, res) => {
    const { id } = req.params
    getExperienceByIdModel(id, result => {
      if (result.length) {
        res.send({
          success: true,
          message: `Data Experience ${id}`,
          data: result[0]
        })
      } else {
        res.send({
          success: false,
          message: `Data Experience ${id} not found`
        })
      }
    })
  },
  updateExperience: (req, res) => {
    const id = req.params.id
    const { companyName, description, workPosition, start, end, idWorker } = req.body
    if (companyName.trim() && description.trim() && workPosition.trim() && start.trim() && end.trim() && idWorker.trim()) {
      updateExperienceModel([companyName, description, workPosition, start, end, idWorker], id, result => {
        console.log(result)
        if (result.affectedRows) {
          res.send({
            success: true,
            messages: `Experience with id ${id} Has Been Updated`
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
  updatePatchExperience: (req, res) => {
    const id = req.params.id
    const { companyName = '', description = '', workPosition = '', start = '', end = '', idWorker = '' } = req.body
    if (companyName.trim() || description.trim() || workPosition.trim() || start.trim() || end.trim() || idWorker.trim()) {
      selectExperienceModel(id, result => {
        const data = Object.entries(req.body).map(item => {
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        if (result.length) {
          updatePatchExperienceModel(data, id, result => {
            if (result.affectedRows) {
              res.send({
                success: true,
                messages: `Experience With id ${id} has been Updated`
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
            messages: 'Data Experience Not Found'
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

  deleteExperience: (req, res) => {
    const { id } = req.params

    selectExperienceModel(id, result => {
      if (result.length) {
        deleteExperienceModel(id, result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `Experience with id ${id} has been deleted`
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
