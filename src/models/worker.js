const db = require('../helpers/db')

module.exports = {
  createWorkerModel: (arr, idAccount, callback) => {
    const query = `INSERT INTO worker (nameWorker, jobTitle, statusJob, city, workPlace, description, image, idAccount) VALUES ('${arr[0]}','${arr[1]}','${arr[2]}','${arr[3]}','${arr[4]}','${arr[5]}','${arr[6]}',${idAccount})`
    db.query(query, (_err, result, _fields) => {
      callback(result)
    })
  },
  getWorkerModel: (searchKey, searchValue, limit, offset, callback) => {
    db.query(`SELECT * FROM worker WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, _fields) => {
      if (!err) {
        callback(result)
      }
    })
  },

  searchWorkerModel: (searchKey, searchValue, limit, offset, sort, order, callback) => {
    let sortWorker = ''
    if (sort != null) {
      if (order != null) {
        sortWorker = `ORDER BY ${sort} ${order}`
      } else {
        sortWorker = 'ORDER BY nameWorker ASC'
      }
    }

    db.query(`SELECT worker.idWorker, worker.image, worker.nameWorker, worker.jobTitle, worker.statusJob, worker.city, GROUP_CONCAT(skill.skill) FROM worker INNER JOIN skill ON worker.idWorker = skill.idWorker 
    WHERE ${searchKey} LIKE '%${searchValue}%' GROUP BY idWorker ${sortWorker} LIMIT ${limit} OFFSET ${offset} `, (_err, result, _field) => {
      callback(result)
    })
  },

  getWorkerByIdModel: (id, callback) => {
    db.query(`SELECT * FROM worker  WHERE idWorker = ${id}`, (_err, result, _field) => {
      callback(result)
    })
  },
  updateWorkerModel: (arr, id, callback) => {
    db.query(`SELECT * FROM worker WHERE idWorker = ${id}`, (_err, result, _field) => {
      if (result.length) {
        db.query(`UPDATE worker SET nameWorker='${arr[0]}', jobTitle='${arr[1]}', statusJob='${arr[2]}', city='${arr[3]}', workPlace='${arr[4]}', description='${arr[5]}', image='${arr[6]}'
         WHERE idWorker = ${id}`, (_err, result, _fields) => {
          callback(result)
        })
      }
    })
  },
  updatePatchWorkerModel: (data, id, callback) => {
    var query = `UPDATE worker SET ${data} WHERE idWorker = ${id}`
    db.query(query, (_err, result, _field) => {
      callback(result)
    })
  },

  deleteWorkerModel: (id, callback) => {
    db.query(`DELETE FROM worker WHERE idWorker = ${id}`, (_err, result, _field) => {
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
    db.query(`UPDATE worker SET updatedAt='${updatedAt}' WHERE idWorker = ${id}`)
  },

  selectWorkerModel: (id, callback) => {
    db.query(`SELECT * FROM worker WHERE idWorker = ${id}`, (_err, result, _field) => {
      callback(result)
    })
  }
}
