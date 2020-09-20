const { createProjectModel, getProjectModel, getProjectByIdModel, updateProjectModel, updatePatchProjectModel, deleteProjectModel, selectProjectModel, updatedAtDate } = require('../models/projects')

module.exports = {

  createProject: (req, res) => {
    const { image, nameProject, description, deadline, idRecruiter, idWorker } = req.body // harus sama yang diinputkan di postman
    if (image && nameProject && description && deadline && idRecruiter && idWorker) {
      createProjectModel([image, nameProject, description, deadline, idRecruiter, idWorker], result => {
        console.log(result)
        res.status(201).send({
          success: true,
          messages: 'Project Has Been Created',
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

  getDataProject: (req, res) => {
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

    getProjectModel(searchKey, searchValue, limit, offset, result => {
      console.log(result)
      if (result.length) { // result itu berupa Array
        res.send({
          success: true,
          messages: 'list Project',
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
  getDataProjectById: (req, res) => {
    const { id } = req.params
    getProjectByIdModel(id, result => {
      if (result.length) {
        res.send({
          success: true,
          message: `Data Project ${id}`,
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
  updateProject: (req, res) => {
    const id = req.params.id
    const { image, nameProject, description, deadline, idRecruiter, idWorker } = req.body
    if (image.trim() && nameProject.trim() && description.trim() && deadline.trim() && idRecruiter.trim() && idWorker.trim()) {
      updateProjectModel([image, nameProject, description, deadline, idRecruiter, idWorker], id, result => {
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
  updatePatchProject: (req, res) => {
    const id = req.params.id
    const { image = '', nameProject = '', description = '', deadline = '', idRecruiter = '', idWorker = '' } = req.body
    if (image.trim() || nameProject.trim() || description.trim() || deadline.trim() || idRecruiter.trim() || idWorker.trim()) {
      selectProjectModel(id, result => {
        const data = Object.entries(req.body).map(item => {
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        if (result.length) {
          updatePatchProjectModel(data, id, result => {
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

  deleteProject: (req, res) => {
    const { id } = req.params

    selectProjectModel(id, result => {
      if (result.length) {
        deleteProjectModel(id, result => {
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
