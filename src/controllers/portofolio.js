const { createPortofolioModel, getPortofolioModel, getPortofolioByIdModel, updatePortofolioModel, updatePatchPortofolioModel, deletePortofolioModel, selectPortofolioModel } = require('../models/portofolio')

module.exports = {

  createPortofolio: (req, res) => {
    const { namePortofolio, linkRepository, typePorto, image, idWorker } = req.body
    if (namePortofolio && linkRepository && typePorto && image && idWorker) {
      createPortofolioModel([namePortofolio, linkRepository, typePorto, image, idWorker], result => {
        console.log(result)
        res.status(201).send({
          success: true,
          messages: 'Portofolio Has Been Created',
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

  getDataPortofolio: (req, res) => {
    let { page, limit, search } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'idPortofolio'
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

    getPortofolioModel(searchKey, searchValue, limit, offset, result => {
      console.log(result)
      if (result.length) { // result itu berupa Array
        res.send({
          success: true,
          messages: 'list Portofolio',
          data: result // result = hasil dari yang diambil dari parameter result
        })
      } else {
        res.send({
          success: true,
          messages: 'There is no Portofolio on list'
        })
      }
    })
  },
  getDataPortofolioById: (req, res) => {
    const { id } = req.params
    getPortofolioByIdModel(id, result => {
      if (result.length) {
        res.send({
          success: true,
          message: `Data Portofolio ${id}`,
          data: result[0]
        })
      } else {
        res.send({
          success: false,
          message: `Data Portofolio ${id} not found`
        })
      }
    })
  },
  updatePortofolio: (req, res) => {
    const id = req.params.id
    const { namePortofolio, linkRepository, typePorto, image, idWorker } = req.body
    if (namePortofolio.trim() && linkRepository.trim() && typePorto.trim() && image.trim() && idWorker.trim()) {
      updatePortofolioModel([namePortofolio, linkRepository, typePorto, image, idWorker], id, result => {
        console.log(result)
        if (result.affectedRows) {
          res.send({
            success: true,
            messages: `Portofolio with id ${id} Has Been Updated`
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
  updatePatchPortofolio: (req, res) => {
    const id = req.params.id
    const { namePortofolio = '', linkRepository = '', typePorto = '', image = '', idWorker = '' } = req.body
    if (namePortofolio.trim() || linkRepository.trim() || typePorto.trim() || image.trim() || idWorker.trim()) {
      selectPortofolioModel(id, result => {
        const data = Object.entries(req.body).map(item => {
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        if (result.length) {
          updatePatchPortofolioModel(data, id, result => {
            if (result.affectedRows) {
              res.send({
                success: true,
                messages: `Portofolio With id ${id} has been Updated`
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
            messages: 'Data Portofolio Not Found'
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

  deletePortofolio: (req, res) => {
    const { id } = req.params

    selectPortofolioModel(id, result => {
      if (result.length) {
        deletePortofolioModel(id, result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `Portofolio with id ${id} has been deleted`
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
