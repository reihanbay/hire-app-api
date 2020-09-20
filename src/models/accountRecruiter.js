const db = require('../helpers/db')

module.exports = {
  createAccountModel: (arr, callback) => {
    const query = `INSERT INTO account_recruiter (name, email, password, noHp, companyName, position) VALUES ('${arr[0]}','${arr[1]}','${arr[2]}',${arr[3]},'${arr[4]}','${arr[5]}')`
    db.query(query, (_err, result, _fields) => {
      callback(result)
    })
  },
  getAccountModel: (searchKey, searchValue, limit, offset, callback) => {
    db.query(`SELECT * FROM account_recruiter WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, _fields) => {
      if (!err) {
        callback(result)
      }
    //   else {
    //     res.send({
    //       success: false,
    //       messages: 'Internal Server error'
    //     })
    //   }
    })
  },
  getAccountByIdModel: (id, callback) => {
    db.query(`SELECT * FROM account_recruiter  WHERE idAccount = ${id}`, (_err, result, _field) => {
      callback(result)
    })
  },
  updateAccountModel: (arr, id, callback) => {
    db.query(`SELECT * FROM account_recruiter WHERE idAccount = ${id}`, (_err, result, _field) => {
      if (result.length) {
        db.query(`UPDATE account_recruiter SET name='${arr[0]}', email='${arr[1]}', password='${arr[2]}', noHp=${arr[3]}, companyName='${arr[4]}', position='${arr[5]}'
         WHERE idAccount = ${id}`, (_err, result, _fields) => {
          callback(result)
        })
      }
    })
  },
  updatePatchAccountModel: (data, id, callback) => {
    var query = `UPDATE account_recruiter SET ${data} WHERE idAccount = ${id}`
    db.query(query, (_err, result, _field) => {
      callback(result)
    })
  },

  deleteAccountModel: (id, callback) => {
    db.query(`DELETE FROM account_recruiter WHERE idAccount = ${id}`, (_err, result, _field) => {
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
    db.query(`UPDATE account_recruiter SET updatedAt='${updatedAt}' WHERE idAccount = ${id}`)
  },

  selectAccountModel: (id, callback) => {
    db.query(`SELECT * FROM account_recruiter WHERE idAccount = ${id}`, (_err, result, _field) => {
      callback(result)
    })
  }
}
