const { createSkillModel, getSkillModel, getSkillByIdModel, updateSkillModel, updatePatchSkillModel, deleteSkillModel, selectSkillModel } = require('../models/skill')

module.exports = {

  createSkill: (req, res) => {
    const { idWorker, skill } = req.body
    if (skill && idWorker) {
      createSkillModel([idWorker, skill], result => {
        console.log(result)
        res.status(201).send({
          success: true,
          messages: 'Skill Has Been Created',
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

  getDataSkill: (req, res) => {
    let { page, limit, search } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'idSkill'
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

    getSkillModel(searchKey, searchValue, limit, offset, result => {
      console.log(result)
      if (result.length) { // result itu berupa Array
        res.send({
          success: true,
          messages: 'list Skill',
          data: result // result = hasil dari yang diambil dari parameter result
        })
      } else {
        res.send({
          success: true,
          messages: 'There is no Skill on list'
        })
      }
    })
  },
  getDataSkillById: (req, res) => {
    const { id } = req.params
    getSkillByIdModel(id, result => {
      if (result.length) {
        res.send({
          success: true,
          message: `Data Skill ${id}`,
          data: result[0]
        })
      } else {
        res.send({
          success: false,
          message: `Data Skill ${id} not found`
        })
      }
    })
  },
  updateSkill: (req, res) => {
    const id = req.params.id
    const { idWorker, skill } = req.body
    if (skill.trim() && idWorker.trim()) {
      updateSkillModel([idWorker, skill], id, result => {
        console.log(result)
        if (result.affectedRows) {
          res.send({
            success: true,
            messages: `Skill with id ${id} Has Been Updated`
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
  updatePatchSkill: (req, res) => {
    const id = req.params.id
    const { idWorker = '', skill = '' } = req.body
    if (skill.trim() || idWorker.trim()) {
      selectSkillModel(id, result => {
        const data = Object.entries(req.body).map(item => {
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        if (result.length) {
          updatePatchSkillModel(data, id, result => {
            if (result.affectedRows) {
              res.send({
                success: true,
                messages: `Skill With id ${id} has been Updated`
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
            messages: 'Data Skill Not Found'
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

  deleteSkill: (req, res) => {
    const { id } = req.params

    selectSkillModel(id, result => {
      if (result.length) {
        deleteSkillModel(id, result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `Skill with id ${id} has been deleted`
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
