const db = require('../helpers/db')

module.exports = {
  createExperienceModel: (arr, callback) => {
    const query = `INSERT INTO experience (companyName, description, workPosition, start, end, idWorker) VALUES ('${arr[0]}','${arr[1]}','${arr[2]}','${arr[3]}','${arr[4]}',${arr[5]})`
    db.query(query, (_err, result, _fields) => {
      callback(result)
    })
  },
  getExperienceModel: (searchKey, searchValue, limit, offset, callback) => {
    db.query(`SELECT * FROM experience WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, _fields) => {
      if (!err) {
        callback(result)
      }
    })
  },
  getExperienceByIdModel: (id, callback) => {
    db.query(`SELECT * FROM experience  WHERE idExperience = ${id}`, (_err, result, _field) => {
      callback(result)
    })
  },
  updateExperienceModel: (arr, id, callback) => {
    db.query(`SELECT * FROM experience WHERE idExperience = ${id}`, (_err, result, _field) => {
      if (result.length) {
        db.query(`UPDATE experience SET companyName='${arr[0]}', description='${arr[1]}', workPosition='${arr[2]}', start='${arr[3]}', end='${arr[4]}', idWorker=${arr[5]}
         WHERE idExperience = ${id}`, (_err, result, _fields) => {
          callback(result)
        })
      }
    })
  },
  updatePatchExperienceModel: (data, id, callback) => {
    var query = `UPDATE experience SET ${data} WHERE idExperience = ${id}`
    db.query(query, (_err, result, _field) => {
      callback(result)
    })
  },

  deleteExperienceModel: (id, callback) => {
    db.query(`DELETE FROM experience WHERE idExperience = ${id}`, (_err, result, _field) => {
      callback(result)
    })
  },

  selectExperienceModel: (id, callback) => {
    db.query(`SELECT * FROM experience WHERE idExperience = ${id}`, (_err, result, _field) => {
      callback(result)
    })
  }
}
