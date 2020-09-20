const { createRecruiterModel, getRecruiterModel, getRecruiterByIdModel, updateRecruiterModel, updatePatchRecruiterModel, deleteRecruiterModel, selectRecruiterModel, updatedAtDate } = require('../models/recruiter')

module.exports = {

  createRecruiter: (req, res) => {
    const idAccount = req.params.id
    const { nameRecruiter, sectorCompany, city, description, image, instagram, linkedin, website } = req.body // harus sama yang diinputkan di postman
    if (nameRecruiter && sectorCompany && city && description && image && instagram && linkedin && website) {
      createRecruiterModel([nameRecruiter, sectorCompany, city, description, image, instagram, linkedin, website], idAccount, result => {
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

  getRecruiter: (req, res) => {
    console.log(req.query)
    let { page, limit, search } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'nameRecruiter'
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

    getRecruiterModel(searchKey, searchValue, limit, offset, result => {
      if (result.length) { // result itu berupa Array
        res.send({
          success: true,
          messages: 'list Recruiter',
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
  getRecruiterById: (req, res) => {
    const { id } = req.params
    getRecruiterByIdModel(id, result => {
      if (result.length) {
        res.send({
          success: true,
          message: `Data Recruiter ${id}`,
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
  updateRecruiter: (req, res) => {
    const id = req.params.id
    const { nameRecruiter, sectorCompany, city, description, image, instagram, linkedin, website } = req.body
    if (nameRecruiter.trim() && sectorCompany.trim() && city.trim() && description.trim() && image.trim() && instagram.trim() && linkedin.trim() && website.trim()) {
      updateRecruiterModel([nameRecruiter, sectorCompany, city, description, image, instagram, linkedin, website], id, result => {
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
  updatePatchRecruiter: (req, res) => {
    const id = req.params.id
    const { nameRecruiter = '', sectorCompany = '', city = '', description = '', image = '', instagram = '', linkedin = '', website = '' } = req.body
    if (nameRecruiter.trim() || sectorCompany.trim() || city.trim() || description.trim() || image.trim() || instagram.trim() || linkedin.trim() || website.trim()) {
      selectRecruiterModel(id, result => {
        const data = Object.entries(req.body).map(item => {
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        if (result.length) {
          updatePatchRecruiterModel(data, id, result => {
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

  deleteRecruiter: (req, res) => {
    const { id } = req.params

    selectRecruiterModel(id, result => {
      if (result.length) {
        deleteRecruiterModel(id, result => {
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
