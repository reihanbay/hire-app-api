const db = require('../helpers/db')

module.exports = {
  createPortofolioModel: (arr, callback) => {
    const query = `INSERT INTO portofolio (namePortofolio, linkRepository, typePorto, image, idWorker) VALUES ('${arr[0]}','${arr[1]}','${arr[2]}','${arr[3]}',${arr[4]})`
    db.query(query, (_err, result, _fields) => {
      callback(result)
    })
  },
  getPortofolioModel: (searchKey, searchValue, limit, offset, callback) => {
    db.query(`SELECT * FROM portofolio WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, _fields) => {
      if (!err) {
        callback(result)
      }
    })
  },
  getPortofolioByIdModel: (id, callback) => {
    db.query(`SELECT * FROM portofolio  WHERE idPortofolio = ${id}`, (_err, result, _field) => {
      callback(result)
    })
  },
  updatePortofolioModel: (arr, id, callback) => {
    db.query(`SELECT * FROM portofolio WHERE idPortofolio = ${id}`, (_err, result, _field) => {
      if (result.length) {
        db.query(`UPDATE portofolio SET namePortofolio='${arr[0]}', linkRepository='${arr[1]}', typePorto='${arr[2]}', image='${arr[3]}', idWorker=${arr[4]}
         WHERE idPortofolio = ${id}`, (_err, result, _fields) => {
          callback(result)
        })
      }
    })
  },
  updatePatchPortofolioModel: (data, id, callback) => {
    var query = `UPDATE portofolio SET ${data} WHERE idPortofolio = ${id}`
    db.query(query, (_err, result, _field) => {
      callback(result)
    })
  },

  deletePortofolioModel: (id, callback) => {
    db.query(`DELETE FROM portofolio WHERE idPortofolio = ${id}`, (_err, result, _field) => {
      callback(result)
    })
  },

  selectPortofolioModel: (id, callback) => {
    db.query(`SELECT * FROM portofolio WHERE idPortofolio = ${id}`, (_err, result, _field) => {
      callback(result)
    })
  }
}
