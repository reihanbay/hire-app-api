const { createRecruiterModel, checkIdAccountModel, getRecruiterModel, getRecruiterByIdModel, updateRecruiterModel, updatePatchRecruiterModel, deleteRecruiterModel, selectRecruiterModel, updatedAtDate } = require('../models/recruiter')

module.exports = {

  createRecruiter: async (req, res) => {
    const { nameRecruiter, nameCompany, position, sectorCompany, city, description, instagram, linkedin, website, idAccount } = req.body
    const image = req.file === undefined ? '' : req.file.filename
    if (nameRecruiter && nameCompany && position && sectorCompany && city && description && instagram && linkedin && website && image && idAccount) {
      const setData = {
        nameRecruiter,
        nameCompany,
        position,
        sectorCompany,
        city,
        description,
        image,
        instagram,
        linkedin,
        website,
        idAccount
      }
      try {
        const checkId = await checkIdAccountModel(idAccount)
        console.log(checkId)
        if (checkId.length === 0) {
          await createRecruiterModel(setData)
          res.send({
            success: true,
            messages: 'Profile Has Been Created',
            data: req.body
          })
        } else {
          res.send({
            success: false,
            message: 'Id already created'
          })
        }
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

  getRecruiter: async (req, res) => {
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
      const result = await getRecruiterModel(searchKey, searchValue, limit, offset)
      if (result.length) {
        res.send({
          success: true,
          messages: 'list Recruiter',
          data: result
        })
      } else {
        res.send({
          success: false,
          messages: 'There is no Recruiter on list'
        })
      }
    } catch (err) {
      res.send({
        success: false,
        messages: 'Bad Request!'
      })
    }
  },
  getRecruiterById: async (req, res) => {
    const { id } = req.params
    try {
      const result = await getRecruiterByIdModel(id)
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
    } catch (err) {
      res.send({
        success: false,
        message: 'Bad Request!'
      })
    }
  },

  updateRecruiter: async (req, res) => {
    const id = req.params.id
    const { nameRecruiter, nameCompany, position, sectorCompany, city, description, instagram, linkedin, website } = req.body
    const image = req.file === undefined ? '' : req.file.filename
    if (nameRecruiter.trim() && nameCompany.trim() && position.trim() && sectorCompany.trim() && city.trim() && description.trim() && image.trim() && instagram.trim() && linkedin.trim() && website.trim()) {
      try {
        const select = await selectRecruiterModel(id)
        if (select.length) {
          const result = await updateRecruiterModel([nameRecruiter, nameCompany, position, sectorCompany, city, description, image, instagram, linkedin, website], id)
          if (result.affectedRows) {
            updatedAtDate(id)
            res.send({
              success: true,
              messages: `Account with id ${id} Has Been Updated`
            })
          } else {
            res.send({
              success: false,
              messages: 'Update Account Failed'
            })
          }
        } else {
          res.send({
            success: false,
            message: `Account with id ${id} not found`
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
        messages: 'Field must be filled'
      })
    }
  },

  updatePatchRecruiter: async (req, res) => {
    const id = req.params.id
    const { nameRecruiter = '', nameCompany = '', position = '', sectorCompany = '', city = '', description = '', instagram = '', linkedin = '', website = '' } = req.body
    const image = req.file === undefined ? '' : req.file.filename
    if (nameRecruiter.trim() || nameCompany.trim() || position.trim() || sectorCompany.trim() || city.trim() || description.trim() || image.trim() || instagram.trim() || linkedin.trim() || website.trim()) {
      const setData = {
        ...req.body,
        image
      }
      const data = Object.entries(setData).map(item => {
        return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
      })
      try {
        const select = await selectRecruiterModel(id)
        if (select.length) {
          const result = await updatePatchRecruiterModel(data, id)
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
            message: 'Recruiter not found'
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

  deleteRecruiter: async (req, res) => {
    const { id } = req.params

    try {
      const select = await selectRecruiterModel(id)
      if (select.length) {
        const result = await deleteRecruiterModel(id)
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
          message: 'Recruiter Not Found'
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
