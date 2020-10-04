const db = require('../helpers/db')

module.exports = {

  postAccount: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO user SET ?', setData, (err, result) => {
        if (!err) {
          const newResult = {
            id: result.insertId,
            ...setData
          }
          delete newResult.password
          resolve(newResult)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  checkEmailModel: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT email FROM user WHERE email = ?', email, (err, result) => {
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
      db.query('SELECT idAccount, email, password, status, role FROM user WHERE email = ?', email, (err, result) => {
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
      db.query(`SELECT idAccount, name, email, password, noHp, status, role FROM user WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, _fields) => {
        if (!err) {
          delete result[0].password
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getAccountByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM user WHERE idAccount = ${id}`, (err, result, _field) => {
        if (!err) {
          delete result[0].password
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateAccountModel: (arr, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE user SET name='${arr[0]}', email='${arr[1]}', password='${arr[2]}', noHp='${arr[3]}' WHERE idAccount = ?`, id, function (err, result, _fields) {
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
      var query = `UPDATE user SET ${data} WHERE idAccount = ${id}`
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
      var query = `DELETE FROM user WHERE idAccount = ${id}`
      db.query(query, (err, result, _field) => {
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
    db.query(`UPDATE user SET updatedAt='${updatedAt}' WHERE idAccount = ${id}`)
  },

  selectAccountModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM user WHERE idAccount = ${id}`, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error('Id Account not selected'))
        }
      })
    })
  }
}
