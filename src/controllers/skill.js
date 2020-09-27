const { createSkillModel, getSkillModel, getSkillByIdModel, updateSkillModel, updatePatchSkillModel, deleteSkillModel, selectSkillModel } = require('../models/skill')

module.exports = {

  createSkill: async (req, res) => {
    const { idWorker, skill } = req.body
    if (skill && idWorker) {
      const setData = { skill, idWorker }
      try {
        await createSkillModel(setData)
        res.status(201).send({
          success: true,
          messages: 'Skill Has Been Created',
          data: req.body
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

  getDataSkill: async (req, res) => {
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
    try {
      const result = await getSkillModel(searchKey, searchValue, limit, offset)
      if (result.length) {
        res.send({
          success: true,
          messages: 'list Skill',
          data: result
        })
      } else {
        res.send({
          success: true,
          messages: 'There is no Skill on list'
        })
      }
    } catch (err) {
      res.send({
        success: true,
        messages: 'Bad Request!'
      })
    }
  },

  getDataSkillById: async (req, res) => {
    const { id } = req.params
    try {
      const result = await getSkillByIdModel(id)
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
    } catch (err) {
      res.send({
        success: false,
        message: 'Bad Request!'
      })
    }
  },
  updateSkill: async (req, res) => {
    const id = req.params.id
    const { idWorker, skill } = req.body
    if (skill.trim() && idWorker.trim()) {
      try {
        const select = await selectSkillModel(id)
        if (select.length) {
          const result = await updateSkillModel([idWorker, skill], id)
          if (result.affectedRows) {
            res.send({
              success: true,
              messages: `Skill with id ${id} Has Been Updated`
            })
          } else {
            res.send({
              success: false,
              messages: 'Update Skill Failed'
            })
          }
        }
      } catch (err) {
        res.send({
          success: false,
          messages: 'Bad Request!'
        })
      }
    } else {
      res.send({
        success: false,
        messages: 'Field must be filled!'
      })
    }
  },

  updatePatchSkill: async (req, res) => {
    const id = req.params.id
    const { idWorker = '', skill = '' } = req.body
    if (skill.trim() || idWorker.trim()) {
      const data = Object.entries(req.body).map(item => {
        return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
      })
      try {
        const select = await selectSkillModel(id)
        if (select.length) {
          const result = await updatePatchSkillModel(data, id)
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
        } else {
          res.send({
            success: false,
            messages: 'Skill Not Found'
          })
        }
      } catch (err) {
        res.send({
          success: false,
          message: 'ERROR!'
        })
      }
    } else {
      res.send({
        success: false,
        messages: 'Field must be filled!'
      })
    }
  },

  deleteSkill: async (req, res) => {
    const { id } = req.params
    try {
      const select = await selectSkillModel(id)
      if (select.length) {
        const result = await deleteSkillModel(id)
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
      } else {
        res.send({
          success: false,
          message: 'Data Skill Not Found'
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
