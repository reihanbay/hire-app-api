const db = require('../helpers/db')

module.exports = {
  createProjectModel: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO projects SET ?', setData, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  // createProjectModel: (arr, callback) => {
  //   const query = `INSERT INTO projects (image, nameProject, description, deadline, idRecruiter, idWorker) VALUES ('${arr[0]}','${arr[1]}','${arr[2]}','${arr[3]}',${arr[4]},${arr[5]})`
  //   db.query(query, (_err, result, _fields) => {
  //     callback(result)
  //   })
  // },
  getProjectModel: (searchKey, searchValue, limit, offset, callback) => {
    db.query(`SELECT * FROM projects WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, _fields) => {
      if (!err) {
        callback(result)
      }
    })
  },
  getProjectByIdModel: (id, callback) => {
    db.query(`SELECT * FROM projects  WHERE idProject = ${id}`, (_err, result, _field) => {
      callback(result)
    })
  },
  updateProjectModel: (arr, id, callback) => {
    db.query(`SELECT * FROM projects WHERE idProject = ${id}`, (_err, result, _field) => {
      if (result.length) {
        db.query(`UPDATE projects SET image='${arr[0]}', nameProject='${arr[1]}', description='${arr[2]}', deadline='${arr[3]}', idRecruiter='${arr[4]}', idWorker='${arr[5]}'
         WHERE idProject = ${id}`, (_err, result, _fields) => {
          callback(result)
        })
      }
    })
  },
  updatePatchProjectModel: (data, id, callback) => {
    var query = `UPDATE projects SET ${data} WHERE idProject = ${id}`
    db.query(query, (_err, result, _field) => {
      callback(result)
    })
  },

  deleteProjectModel: (id, callback) => {
    db.query(`DELETE FROM projects WHERE idProject = ${id}`, (_err, result, _field) => {
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
    db.query(`UPDATE projects SET updatedAt='${updatedAt}' WHERE idProject = ${id}`)
  },

  selectProjectModel: (id, callback) => {
    db.query(`SELECT * FROM projects WHERE idProject = ${id}`, (_err, result, _field) => {
      callback(result)
    })
  }
}
