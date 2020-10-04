const db = require('../helpers/db')

module.exports = {
  createExperienceModel: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO experience SET ?', setData, (err, result, _fields) => {
        if (!err) {
          const newResult = {
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getExperienceModel: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM experience WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getExperienceByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM experience  WHERE idWorker = ?', id, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateExperienceModel: (arr, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE experience SET companyName='${arr[0]}', description='${arr[1]}', workPosition='${arr[2]}', start='${arr[3]}', end='${arr[4]}', idWorker=${arr[5]}
         WHERE idExperience = ?`, id, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updatePatchExperienceModel: (data, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE experience SET ${data} WHERE idExperience = ?`, id, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deleteExperienceModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM experience WHERE idExperience = ?', id, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  selectExperienceModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM experience WHERE idExperience = ?', id, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
