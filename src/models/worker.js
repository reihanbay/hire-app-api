const db = require('../helpers/db')

module.exports = {
  createWorkerModel: (setData) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO worker SET ?'
      db.query(query, setData, (err, result, _fields) => {
        if (!err) {
          const newResult = {
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  checkIdAccountModel: (idAccount) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT idAccount FROM worker WHERE idAccount = ?', idAccount, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  searchWorkerModel: (searchKey, searchValue, limit, offset, sort, order) => {
    return new Promise((resolve, reject) => {
      let sortWorker = ''
      if (sort != null) {
        if (order != null) {
          sortWorker = `ORDER BY ${sort} ${order}`
        } else {
          sortWorker = 'ORDER BY nameWorker ASC'
        }
      }
      db.query(`SELECT worker.idWorker, worker.image, worker.nameWorker, worker.jobTitle, worker.statusJob, worker.city, GROUP_CONCAT(IFNULL(skill.skill, 'Not Any Skill')) AS skill FROM worker LEFT JOIN skill ON worker.idWorker = skill.idWorker 
      WHERE ${searchKey} LIKE '%${searchValue}%' GROUP BY idWorker ${sortWorker} LIMIT ${limit} OFFSET ${offset} `, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getWorkerByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT worker.idWorker, worker.*, GROUP_CONCAT(IFNULL(skill.skill, \'not any skill\')) AS skill FROM worker LEFT JOIN skill ON worker.idWorker = skill.idWorker WHERE worker.idWorker = ? GROUP BY idWorker', id, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateWorkerModel: (arr, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE worker SET nameWorker='${arr[0]}', jobTitle='${arr[1]}', statusJob='${arr[2]}', city='${arr[3]}', workPlace='${arr[4]}', description='${arr[5]}', image='${arr[6]}'
        WHERE idWorker = ?`, id, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updatePatchWorkerModel: (data, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE worker SET ${data} WHERE idWorker = ?`, id, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deleteWorkerModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM worker WHERE idWorker = ? ', id, (err, result, _field) => {
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
    db.query(`UPDATE worker SET updatedAt='${updatedAt}' WHERE idWorker = ${id}`)
  },

  selectWorkerModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM worker WHERE idWorker = ${id}`, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error('Id Worker not selected'))
        }
      })
    })
  }
}
