const { createPortfolioModel, getPortfolioModel, getPortfolioByIdModel, getPortfolioByIdWorkerModel, updatePortfolioModel, updatePatchPortfolioModel, deletePortfolioModel, selectPortfolioModel } = require('../models/portfolio')

module.exports = {

  createPortfolio: async (req, res) => {
    const { namePortfolio, linkRepository, typePortfolio, idWorker } = req.body
    console.log(req.body)
    if (namePortfolio && linkRepository && typePortfolio && idWorker) {
      const setData = {
        namePortfolio,
        linkRepository,
        typePortfolio,
        idWorker,
        image: req.file === undefined ? '' : req.file.filename
      }
      console.log(setData)
      try {
        await createPortfolioModel(setData)
        res.status(201).send({
          success: true,
          message: 'Portfolio Has Been Created',
          data: req.body
        })
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
  getDataPortfolio: async (req, res) => {
    let { page, limit, search } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'idPortfolio'
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
      const result = await getPortfolioModel(searchKey, searchValue, limit, offset)
      if (result.length) { // result itu berupa Array
        res.send({
          success: true,
          messages: 'list Portfolio',
          data: result // result = hasil dari yang diambil dari parameter result
        })
      } else {
        res.send({
          success: true,
          messages: 'There is no Portfolio on list'
        })
      }
    } catch (err) {
      res.send({
        success: false,
        message: 'Bad Request!'
      })
    }
  },
  getDataPortfolioById: async (req, res) => {
    const { id } = req.params
    try {
      const result = await getPortfolioByIdModel(id)
      if (result.length) {
        res.send({
          success: true,
          message: `Data Portfolio ${id}`,
          data: result[0]
        })
      } else {
        res.send({
          success: false,
          message: `Data Portfolio ${id} not found`
        })
      }
    } catch (err) {
      res.send({
        success: false,
        message: 'Bad Request'
      })
    }
  },
  getDataPortfolioByIdWorker: async (req, res) => {
    const { id } = req.params
    try {
      const result = await getPortfolioByIdWorkerModel(id)
      if (result.length) {
        res.send({
          success: true,
          message: `Data Portfolio ${id}`,
          data: result[0]
        })
      } else {
        res.send({
          success: false,
          message: `Data Portfolio ${id} not found`
        })
      }
    } catch (err) {
      res.send({
        success: false,
        message: 'Bad Request'
      })
    }
  },
  updatePortfolio: async (req, res) => {
    const id = req.params.id
    const { namePortfolio, linkRepository, typePortfolio, idWorker } = req.body
    const image = req.file === undefined ? '' : req.file.filename
    if (namePortfolio.trim() && linkRepository.trim() && typePortfolio.trim() && image.trim() && idWorker.trim()) {
      try {
        const select = await selectPortfolioModel(id)
        if (select.length) {
          const result = await updatePortfolioModel([namePortfolio, linkRepository, typePortfolio, image, idWorker], id)
          if (result.affectedRows) {
            res.send({
              success: true,
              messages: `Portfolio with id ${id} Has Been Updated`
            })
          } else {
            res.send({
              success: false,
              messages: 'Update portfolio failed'
            })
          }
        } else {
          res.send({
            success: false,
            message: `Portfolio with id ${id} not found`
          })
        }
      } catch (err) {
        res.send({
          success: false,
          messages: 'Bad request'
        })
      }
    } else {
      res.send({
        success: false,
        messages: 'Field must be filled'
      })
    }
  },
  updatePatchPortfolio: async (req, res) => {
    const id = req.params.id
    const { namePortfolio = '', linkRepository = '', typePortfolio = '', image = '', idWorker = '' } = req.body
    if (namePortfolio.trim() || linkRepository.trim() || typePortfolio.trim() || image.trim() || idWorker.trim()) {
      const setData = {
        namePortfolio,
        linkRepository,
        typePortfolio,
        image: req.file === undefined ? '' : req.file.filename,
        idWorker
      }
      const data = Object.entries(setData).map(item => {
        return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
      })

      try {
        const select = await selectPortfolioModel(id)
        if (select.length) {
          const result = await updatePatchPortfolioModel(data, id)
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `Portfolio With id ${id} has been Updated`
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
            message: `Portfolio with id ${id} not found`
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
  deletePortfolio: async (req, res) => {
    const { id } = req.params
    try {
      const select = await selectPortfolioModel(id)
      if (select.length) {
        const result = await deletePortfolioModel(id)
        if (result.affectedRows) {
          res.send({
            success: true,
            message: `Portfolio with id ${id} has been deleted`
          })
        } else {
          res.send({
            success: false,
            message: 'Failed delete portfolio'
          })
        }
      } else {
        res.send({
          success: false,
          message: `Portofolio with id ${id} not found`
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
