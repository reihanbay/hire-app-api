const db = require('../helpers/db')

module.exports = {
  createRecruiterModel: (arr, idAccount, callback) => {
    const query = `INSERT INTO recruiter (nameRecruiter, sectorCompany, city, description, image, instagram, linkedin, website, idAccount) VALUES ('${arr[0]}','${arr[1]}','${arr[2]}','${arr[3]}','${arr[4]}','${arr[5]}','${arr[6]}','${arr[7]}',${idAccount})`
    db.query(query, (_err, result, _fields) => {
      callback(result)
    })
  },
  getRecruiterModel: (searchKey, searchValue, limit, offset, callback) => {
    db.query(`SELECT * FROM recruiter WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, _fields) => {
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
  getRecruiterByIdModel: (id, callback) => {
    db.query(`SELECT * FROM recruiter  WHERE idRecruiter = ${id}`, (_err, result, _field) => {
      callback(result)
    })
  },
  updateRecruiterModel: (arr, id, callback) => {
    db.query(`SELECT * FROM recruiter WHERE idRecruiter = ${id}`, (_err, result, _field) => {
      if (result.length) {
        db.query(`UPDATE recruiter SET nameRecruiter='${arr[0]}', sectorCompany='${arr[1]}', city='${arr[2]}', description='${arr[3]}', image='${arr[4]}', instagram='${arr[5]}', linkedin='${arr[6]}', website='${arr[7]}'
         WHERE idRecruiter = ${id}`, (_err, result, _fields) => {
          callback(result)
        })
      }
    })
  },
  updatePatchRecruiterModel: (data, id, callback) => {
    var query = `UPDATE recruiter SET ${data} WHERE idRecruiter = ${id}`
    db.query(query, (_err, result, _field) => {
      callback(result)
    })
  },

  deleteRecruiterModel: (id, callback) => {
    db.query(`DELETE FROM recruiter WHERE idRecruiter = ${id}`, (_err, result, _field) => {
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
    db.query(`UPDATE recruiter SET updatedAt='${updatedAt}' WHERE idRecruiter = ${id}`)
  },

  selectRecruiterModel: (id, callback) => {
    db.query(`SELECT * FROM recruiter WHERE idRecruiter = ${id}`, (_err, result, _field) => {
      callback(result)
    })
  }
}
