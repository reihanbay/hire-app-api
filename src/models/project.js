const db = require('../helpers/db')

module.exports = {
  getDataProjectModel: (searchKey, searchValue, limit, offset, callback) => {
    db.query(`SELECT * FROM project WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, _fields) => {
      if (!err) {
        callback(result)
      }
    })
  },

  getDataProjectByIDModel: (id, callback) => {
    db.query(`SELECT * FROM project  WHERE id = ${id}`, (_err, result, _field) => {
      callback(result)
    })
  },

  createProjectModel: (arr, callback) => {
    const query = `INSERT INTO project (nameProject, description, price, duration) VALUES ('${arr[0]}','${arr[1]}',${arr[2]},'${arr[3]}')`
    db.query(query, (_err, result, _fields) => {
      callback(result)
    })
  },

  updateProjectModel: (arr, idProject, callback) => {
    db.query(`SELECT * FROM project WHERE id = ${idProject}`, (_err, result, _field) => {
      if (result.length) {
        db.query(`UPDATE project SET nameProject='${arr[0]}', description='${arr[1]}', price=${arr[2]}, duration='${arr[3]}'
         WHERE id = ${idProject}`, (_err, result, _fields) => {
          callback(result)
        })
      }
    })
  },

  patchProjectModel: (data, idProject, callback) => {
    var query = `UPDATE project SET ${data} WHERE id = ${idProject}`
    db.query(query, (_err, result, _field) => {
      callback(result)
    })
  },

  deleteProjectModel: (idProject, callback) => {
    db.query(`DELETE FROM project WHERE id = ${idProject}`, (_err, result, _field) => {
      callback(result)
    })
  },

  selectProjectModel: (idProject, callback) => {
    db.query(`SELECT * FROM project WHERE id = ${idProject}`, (_err, result, _field) => {
      callback(result)
    })
  }
}
