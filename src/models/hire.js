const db = require('../helpers/db')

module.exports = {
  createHireModel: (setData) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO hire SET ?'
      db.query(query, setData, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getHireModel: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT hire.*, recruiter.nameRecruiter AS recruiter FROM hire INNER JOIN project ON hire.idProject = project.idProject INNER JOIN recruiter ON project.idRecruiter = recruiter.idRecruiter WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset} GROUP BY idHire`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getHireByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT hire.*, recruiter.nameRecruiter AS recruiter FROM hire INNER JOIN project ON hire.idProject = project.idProject INNER JOIN recruiter ON project.idRecruiter = recruiter.idRecruiter WHERE idHire = ?', id, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateHireModel: (arr, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE hire SET projectJob='${arr[0]}', message='${arr[1]}', statusConfirm='${arr[2]}', dateConfirm='${arr[3]}', price='${arr[4]}'
      WHERE idHire = ${id} `, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updatePatchHireModel: (data, id) => {
    return new Promise((resolve, reject) => {
      var query = `UPDATE hire SET ${data} WHERE idHire = ?`
      db.query(query, id, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deleteHireModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM hire WHERE idHire = ?', id, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updatedAtDate: (id) => {
    const date = new Date()
    var dateNow = date.getFullYear() + '-' +
    ('00' + (date.getMonth() + 1)).slice(-2) + '-' +
    ('00' + date.getDate()).slice(-2) + ' ' +
    ('00' + date.getHours()).slice(-2) + ':' +
    ('00' + date.getMinutes()).slice(-2) + ':' +
    ('00' + date.getSeconds()).slice(-2) + '.' +
    ('00' + date.getMilliseconds()).slice(-2)
    console.log(date)
    const updatedAt = dateNow
    db.query(`UPDATE hire SET updatedAt='${updatedAt}' WHERE idHire = ${id}`)
  },

  selectHireModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM hire WHERE idHire = ?', id, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
