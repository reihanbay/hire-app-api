const db = require('../helpers/db')

module.exports = {
  createSkillModel: (arr, callback) => {
    const query = `INSERT INTO skill (idWorker, skill) VALUES (${arr[0]},'${arr[1]}')`
    db.query(query, (_err, result, _fields) => {
      callback(result)
    })
  },
  getSkillModel: (searchKey, searchValue, limit, offset, callback) => {
    db.query(`SELECT * FROM skill WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, _fields) => {
      if (!err) {
        callback(result)
      }
    })
  },
  getSkillByIdModel: (id, callback) => {
    db.query(`SELECT * FROM skill  WHERE idSkill = ${id}`, (_err, result, _field) => {
      callback(result)
    })
  },
  updateSkillModel: (arr, id, callback) => {
    db.query(`SELECT * FROM skill WHERE idSkill = ${id}`, (_err, result, _field) => {
      if (result.length) {
        db.query(`UPDATE skill SET idWorker=${arr[0]}, skill='${arr[1]}'
         WHERE idSkill = ${id}`, (_err, result, _fields) => {
          callback(result)
        })
      }
    })
  },
  updatePatchSkillModel: (data, id, callback) => {
    var query = `UPDATE skill SET ${data} WHERE idSkill = ${id}`
    db.query(query, (_err, result, _field) => {
      callback(result)
    })
  },

  deleteSkillModel: (id, callback) => {
    db.query(`DELETE FROM skill WHERE idSkill = ${id}`, (_err, result, _field) => {
      callback(result)
    })
  },

  selectSkillModel: (id, callback) => {
    db.query(`SELECT * FROM skill WHERE idSkill = ${id}`, (_err, result, _field) => {
      callback(result)
    })
  }
}
