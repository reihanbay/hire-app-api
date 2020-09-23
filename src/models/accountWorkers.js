const db = require('../helpers/db')

module.exports = {

  postAccount: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO account_worker SET ?', setData, (err, result) => {
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
      db.query('SELECT email FROM account_worker WHERE email = ?', email, (err, result) => {
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
      db.query('SELECT idAccount, email, password, status FROM account_worker WHERE email = ?', email, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getAccountModel: (searchKey, searchValue, limit, offset, callback) => {
    db.query(`SELECT * FROM account_worker WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, _fields) => {
      if (!err) {
        callback(result)
      }
    })
  },
  getAccountByIdModel: (id, callback) => {
    db.query(`SELECT * FROM account_worker  WHERE idAccount = ${id}`, (_err, result, _field) => {
      callback(result)
    })
  },
  updateAccountModel: (arr, id, callback) => {
    db.query(`SELECT * FROM account_worker WHERE idAccount = ${id}`, (_err, result, _field) => {
      if (result.length) {
        db.query(`UPDATE account_worker SET name='${arr[0]}', email='${arr[1]}', password='${arr[2]}', noHp=${arr[3]}
         WHERE idAccount = ${id}`, (_err, result, _fields) => {
          callback(result)
        })
      }
    })
  },
  updatePatchAccountModel: (data, id, callback) => {
    var query = `UPDATE account_worker SET ${data} WHERE idAccount = ${id}`
    db.query(query, (_err, result, _field) => {
      callback(result)
    })
  },

  deleteAccountModel: (id, callback) => {
    db.query(`DELETE FROM account_worker WHERE idAccount = ${id}`, (_err, result, _field) => {
      callback(result)
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
    db.query(`UPDATE account_worker SET updatedAt='${updatedAt}' WHERE idAccount = ${id}`)
  },

  selectAccountModel: (id, callback) => {
    db.query(`SELECT * FROM account_worker WHERE idAccount = ${id}`, (_err, result, _field) => {
      callback(result)
    })
  }
}
