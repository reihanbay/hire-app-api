const db = require('../helpers/db')

module.exports = {
  registerAccountModel: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO account_recruiter SET ?', setData, (err, result) => {
        if (!err) {
          const newResult = {
            id: result.insertId,
            ...setData
          }
          delete newResult.password
          console.log(newResult)
          resolve(newResult)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  checkEmailModel: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT email FROM account_recruiter WHERE email = ?', email, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  loginAccountModel: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT idAccount, email, password FROM account_recruiter WHERE email = ?', email, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getAccountModel: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM account_recruiter WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getAccountByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM account_recruiter  WHERE idAccount = ${id}`, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateAccountModel: (arr, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE account_recruiter SET name='${arr[0]}', email='${arr[1]}', password='${arr[2]}', noHp=${arr[3]}, companyName='${arr[4]}', position='${arr[5]}'
         WHERE idAccount = ${id}`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updatePatchAccountModel: (data, id) => {
    return new Promise((resolve, reject) => {
      var query = `UPDATE account_recruiter SET ${data} WHERE idAccount = ${id}`
      db.query(query, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deleteAccountModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM account_recruiter WHERE idAccount = ?', id, (err, result, _field) => {
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
    db.query(`UPDATE account_recruiter SET updatedAt='${updatedAt}' WHERE idAccount = ${id}`)
  },

  selectAccountModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM account_recruiter WHERE idAccount = ${id}`, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
