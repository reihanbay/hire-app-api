const { getDataProjectModel, getDataProjectByIDModel, createProjectModel, updateProjectModel, selectProjectModel, patchProjectModel, deleteProjectModel } = require('../models/project')

module.exports = {
  getDataProject: (req, res) => {
    console.log(req.query)
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

    getDataProjectModel(searchKey, searchValue, limit, offset, result => {
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

  getDataProjectByID: (req, res) => {
    const { id } = req.params
    getDataProjectByIDModel(id, result => {
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

  createProject: (req, res) => {
    const { nameProject, description, price, duration } = req.body // harus sama yang diinputkan di postman
    if (nameProject && description && price && duration) {
      createProjectModel([nameProject, description, price, duration], result => {
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

  updateProject: (req, res) => {
    const idProject = req.params.id
    const { nameProject, description, price, duration } = req.body
    if (nameProject.trim() && description.trim() && price.trim() && duration.trim()) {
      updateProjectModel([nameProject, description, price, duration], idProject, result => {
        console.log(result)
        if (result.affectedRows) {
          res.send({
            success: true,
            messages: `Project with id ${idProject} Has Been Updated`
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

  patchProject: (req, res) => {
    const id = req.params.id
    const { name_project = '', description = '', price = '', duration = '' } = req.body
    if (name_project.trim() || description.trim() || price.trim() || duration.trim()) {
      selectProjectModel(id, result => {
        const data = Object.entries(req.body).map(item => {
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        if (result.length) {
          patchProjectModel(data, id, result => {
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
    const idProject = id

    selectProjectModel(idProject, result => {
      if (result.length) {
        deleteProjectModel(idProject, result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `Item Project id ${id} has been deleted`
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
