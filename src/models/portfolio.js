const db = require('../helpers/db')

module.exports = {
  createPortfolioModel: (setData) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO portfolio SET ?'
      db.query(query, setData, (err, result, _fields) => {
        if (!err) {
          const newResult = {
            idPortfolio: result.insertId,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getPortfolioModel: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM portfolio WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getPortfolioByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM portfolio  WHERE idPortfolio = ${id}`, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getPortfolioByIdWorkerModel: (idWorker) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM portfolio  WHERE idWorker = ${idWorker}`, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updatePortfolioModel: (arr, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE portfolio SET namePortfolio='${arr[0]}', linkRepository='${arr[1]}', typePortfolio='${arr[2]}', image='${arr[3]}', idWorker=${arr[4]}
         WHERE idPortfolio = ${id}`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updatePatchPortfolioModel: (data, id) => {
    return new Promise((resolve, reject) => {
      var query = `UPDATE portfolio SET ${data} WHERE idPortfolio = ?`
      db.query(query, id, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deletePortfolioModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM portfolio WHERE idPortfolio = ${id}`, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  selectPortfolioModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM portfolio WHERE idPortfolio = ${id}`, (err, result, _field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
