const db = require('../helpers/db')

module.exports = {
  createHireModel: (arr, callback) => {
    const query = `INSERT INTO hire (projectJob, message, statusConfirm, dateConfirm, price, idWorker, idProject) VALUES ('${arr[0]}','${arr[1]}',${arr[2]},'${arr[3]}',${arr[4]},${arr[5]}, ${arr[6]})`
    db.query(query, (_err, result, _fields) => {
      callback(result)
    })
  },
  getHireModel: (searchKey, searchValue, limit, offset, callback) => {
    db.query(`SELECT * FROM hire WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, _fields) => {
      if (!err) {
        callback(result)
      }
    })
  },
  getHireByIdModel: (id, callback) => {
    db.query(`SELECT * FROM hire  WHERE idHire = ${id}`, (_err, result, _field) => {
      callback(result)
    })
  },
  updateHireModel: (arr, id, callback) => {
    db.query(`SELECT * FROM hire WHERE idHire = ${id}`, (_err, result, _field) => {
      if (result.length) {
        db.query(`UPDATE hire SET projectJob='${arr[0]}', message='${arr[1]}', statusConfirm='${arr[2]}', dateConfirm='${arr[3]}', price='${arr[4]}', idWorker='${arr[5]}', idProject='${arr[6]}'
         WHERE idHire = ${id}`, (_err, result, _fields) => {
          callback(result)
        })
      }
    })
  },
  updatePatchHireModel: (data, id, callback) => {
    var query = `UPDATE hire SET ${data} WHERE idHire = ${id}`
    db.query(query, (_err, result, _field) => {
      callback(result)
    })
  },

  deleteHireModel: (id, callback) => {
    db.query(`DELETE FROM hire WHERE idHire = ${id}`, (_err, result, _field) => {
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
    db.query(`UPDATE hire SET updatedAt='${updatedAt}' WHERE idHire = ${id}`)
  },

  selectHireModel: (id, callback) => {
    db.query(`SELECT * FROM hire WHERE idHire = ${id}`, (_err, result, _field) => {
      callback(result)
    })
  }
}
