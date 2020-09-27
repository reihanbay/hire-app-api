const db = require('../helpers/db')

module.exports = {
  createSkillModel: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO skill SET ?', setData, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getSkillModel: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM skill WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getSkillByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM skill  WHERE idSkill = ?', id, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateSkillModel: (arr, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE skill SET idWorker=${arr[0]}, skill='${arr[1]}'
         WHERE idSkill = ?`, id, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updatePatchSkillModel: (data, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE skill SET ${data} WHERE idSkill = ?`, id, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deleteSkillModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM skill WHERE idSkill = ?', id, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  selectSkillModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM skill WHERE idSkill = ?', id, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
