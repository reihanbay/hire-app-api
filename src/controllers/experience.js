const { createExperienceModel, getExperienceModel, getExperienceByIdModel, updateExperienceModel, updatePatchExperienceModel, deleteExperienceModel, selectExperienceModel } = require('../models/experience')

module.exports = {

  createExperience: async (req, res) => {
    const { companyName, description, workPosition, start, end, idWorker } = req.body
    if (companyName && description && workPosition && start && end && idWorker) {
      const setData = { companyName, description, workPosition, start, end, idWorker }
      try {
        await createExperienceModel(setData)
        res.status(201).send({
          success: true,
          messages: 'Experience Has Been Created',
          data: setData
        })
      } catch (err) {
        res.send({
          success: false,
          message: 'Bad Request!'
        })
      }
    } else {
      res.status(500).send({
        success: false,
        messages: 'Field must be filled'
      })
    }
  },

  getDataExperience: async (req, res) => {
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
      limit = 3
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
      const result = await getExperienceModel(searchKey, searchValue, limit, offset)
      if (result.length) { // result itu berupa Array
        res.send({
          success: true,
          messages: 'list Experience',
          data: result // result = hasil dari yang diambil dari parameter result
        })
      } else {
        res.send({
          success: false,
          messages: 'There is no Experience on list'
        })
      }
    } catch (err) {
      res.send({
        success: false,
        message: 'Bad Request!'
      })
    }
  },
  getDataExperienceById: async (req, res) => {
    const { id } = req.params
    try {
      const result = await getExperienceByIdModel(id)
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
    } catch (err) {
      res.send({
        success: false,
        message: 'Bad Request!'
      })
    }
  },
  updateExperience: async (req, res) => {
    const id = req.params.id
    const { companyName, description, workPosition, start, end, idWorker } = req.body
    if (companyName.trim() && description.trim() && workPosition.trim() && start.trim() && end.trim() && idWorker.trim()) {
      try {
        const select = await selectExperienceModel(id)
        if (select.length) {
          const result = await updateExperienceModel([companyName, description, workPosition, start, end, idWorker], id)
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
        } else {
          res.send({
            success: false,
            message: `Experience with id ${id} not found`
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
        message: 'Field must be filled'
      })
    }
  },
  updatePatchExperience: async (req, res) => {
    const id = req.params.id
    const { companyName = '', description = '', workPosition = '', start = '', end = '', idWorker = '' } = req.body
    if (companyName.trim() || description.trim() || workPosition.trim() || start.trim() || end.trim() || idWorker.trim()) {
      const setData = { companyName, description, workPosition, start, end, idWorker }
      const data = Object.entries(setData).map(item => {
        return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
      })
      try {
        const select = await selectExperienceModel(id)
        if (select.length) {
          const result = await updatePatchExperienceModel(data, id)
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
        } else {
          res.send({
            success: false,
            message: 'Experience Not Found'
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
        message: 'Field must be filled'
      })
    }
  },

  deleteExperience: async (req, res) => {
    const { id } = req.params
    try {
      const select = await selectExperienceModel(id)
      if (select.length) {
        const result = await deleteExperienceModel(id)
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
      } else {
        res.send({
          success: false,
          message: 'Experience Not Found'
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
