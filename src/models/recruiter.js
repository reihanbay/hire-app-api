const db = require('../helpers/db')

module.exports = {
  createRecruiterModel: (setData) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO recruiter SET ?'
      db.query(query, setData, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  checkIdAccountModel: (idAccount) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT idAccount FROM recruiter WHERE idAccount = ?', idAccount, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getRecruiterModel: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM recruiter WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getRecruiterByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recruiter  WHERE idRecruiter = ?', id, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateRecruiterModel: (arr, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE recruiter SET nameRecruiter='${arr[0]}', sectorCompany='${arr[1]}', city='${arr[2]}', description='${arr[3]}', image='${arr[4]}', instagram='${arr[5]}', linkedin='${arr[6]}', website='${arr[7]}'
         WHERE idRecruiter = ?`, id, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updatePatchRecruiterModel: (data, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE recruiter SET ${data} WHERE idRecruiter = ?`, id, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deleteRecruiterModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM recruiter WHERE idRecruiter = ?', id, (err, result, _field) => {
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
    db.query(`UPDATE recruiter SET updatedAt='${updatedAt}' WHERE idRecruiter = ${id}`)
  },

  selectRecruiterModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recruiter WHERE idRecruiter = ?', id, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
