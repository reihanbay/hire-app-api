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

  getProjectModel: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM projects WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getProjectByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT projects.*, IF(GROUP_CONCAT(worker.nameWorker) IS NOT NULL, GROUP_CONCAT(worker.nameWorker) 'NULL') AS worker FROM projects INNER JOIN hire ON projects.idProject = hire.idProject INNER JOIN worker ON hire.idWorker = worker.idWorker WHERE projects.idProject = ${id} GROUP BY idProject`, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateProjectModel: (arr, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE projects SET image='${arr[0]}', nameProject='${arr[1]}', description='${arr[2]}', deadline='${arr[3]}', idRecruiter='${arr[4]}', idWorker='${arr[5]}'
         WHERE idProject = ${id}`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updatePatchProjectModel: (data, id) => {
    return new Promise((resolve, reject) => {
      var query = `UPDATE projects SET ${data} WHERE idProject = ?`
      db.query(query, id, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deleteProjectModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM projects WHERE idProject = ? ', id, (err, result, _field) => {
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
    db.query(`UPDATE projects SET updatedAt='${updatedAt}' WHERE idProject = ${id}`)
  },

  selectProjectModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM projects WHERE idProject = ? ', id, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
