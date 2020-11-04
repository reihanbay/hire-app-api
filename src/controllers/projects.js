const { createProjectModel, getProjectModel, getProjectByIdModel, updateProjectModel, updatePatchProjectModel, deleteProjectModel, selectProjectModel, updatedAtDate } = require('../models/projects')

module.exports = {

  createProject: async (req, res) => {
    const { nameProject, description, deadline, idRecruiter } = req.body // harus sama yang diinputkan di postman
    if (nameProject && description && deadline && idRecruiter) {
      try {
        const setData = {
          nameProject,
          description,
          deadline,
          idRecruiter,
          image: req.file === undefined ? '' : req.file.filename
        }
        const create = await createProjectModel(setData)
        console.log(create)
        res.send({
          success: true,
          message: 'Create Project Success',
          data: setData
        })
      } catch (err) {
        console.log(err)
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

  getDataProject: async (req, res) => {
    let { page, limit, search } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'nameProject'
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
      const result = await getProjectModel(searchKey, searchValue, limit, offset)
      if (result.length) { // result itu berupa Array
        res.send({
          success: true,
          messages: 'list Project',
          data: result // result = hasil dari yang diambil dari parameter result
        })
      } else {
        res.send({
          success: false,
          messages: 'There is no project on list'
        })
      }
    } catch (err) {
      res.send({
        success: false,
        message: 'Bad Request'
      })
    }
  },

  getDataProjectById: async (req, res) => {
    const { id } = req.params
    try {
      var result = await getProjectByIdModel(id)
      console.log(result)
      if (result.length) {
        res.send({
          success: true,
          message: `Data Project ${id}`,
          data: result[0]
        })
      } else {
        res.send({
          success: false,
          message: `Data Account ${id} not found`,
          data: result[0]
        })
      }
    } catch (err) {
      res.send({
        success: false,
        message: 'Bad Request'
      })
    }
  },
  updateProject: async (req, res) => {
    const id = req.params.id
    const { nameProject, description, deadline, idRecruiter } = req.body
    const image = req.file === undefined ? '' : req.file.filename
    if (image.trim() && nameProject.trim() && description.trim() && deadline.trim() && idRecruiter.trim()) {
      try {
        const select = await selectProjectModel(id)
        if (select.length) {
          const result = await updateProjectModel([image, nameProject, description, deadline, idRecruiter], id)
          if (result.affectedRows) {
            updatedAtDate(id)
            res.send({
              success: true,
              messages: `Project with id ${id} Has Been Updated`
            })
          } else {
            res.send({
              success: false,
              messages: 'Update Project Failed'
            })
          }
        } else {
          res.send({
            success: false,
            messages: 'Project Not Found'
          })
        }
      } catch (err) {
        res.send({
          success: false,
          messages: `${err}`
        })
      }
    } else {
      res.send({
        success: false,
        messages: 'Field must be filled'
      })
    }
  },
  updatePatchProject: async (req, res) => {
    const id = req.params.id
    const { nameProject = '', description = '', deadline = '', idRecruiter = '' } = req.body
    const image = req.file === undefined ? '' : req.file.filename
    if (image.trim() || nameProject.trim() || description.trim() || deadline.trim() || idRecruiter.trim()) {
      const setData = {
        ...req.body,
        image
      }
      const data = Object.entries(setData).map(item => {
        if ((item[1]) !== setData.deadline) {
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        } else {
          return (item[1]) === setData.deadline ? `${item[0]}='${setData.deadline}'` : 'Error Request!'
        }
      })
      try {
        console.log(data)
        const select = await selectProjectModel(id)
        if (select.length) {
          const result = await updatePatchProjectModel(data, id)
          if (result.affectedRows) {
            res.send({
              success: true,
              messages: `Project With id ${id} has been Updated`
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
            messages: 'Data Project Not Found'
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
        message: 'Field must be filled'
      })
    }
  },

  deleteProject: async (req, res) => {
    const { id } = req.params

    try {
      const select = await selectProjectModel(id)
      if (select.length) {
        const result = await deleteProjectModel(id)
        if (result.affectedRows) {
          res.send({
            success: true,
            message: `Project with id ${id} has been deleted`
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
          message: 'Project Not Found'
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
