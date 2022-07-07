const sqlite3 = require('sqlite3');
const Promise = require('bluebird');
var log = require("log4js").getLogger("deviants-factions dao");

class AppDAO {
    constructor(dbFilePath) {
      this.db = new sqlite3.Database(dbFilePath, (err) => {
        if (err) {
          log.error(`Could not connect to database ${err}`);
        } else {
          log.debug('Connected to database');
        }
      })
    }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
          this.db.run(sql, params, function (err, result) {
            if (err) {
              log.error(`Error running sql ${sql}`);
              log.error(err);
              reject(err);
            } else {
              resolve(result);
            }
          })
        });
    }

    get(sql, params = []) {
        return new Promise((resolve, reject) => {
          this.db.get(sql, params, (err, result) => {
            if (err) {
              log.error(`Error running sql ${sql}`);
              log.error(err);
              reject(err)
            } else {
              resolve(result)
            }
          })
        });
    }

    all(sql) {
      return new Promise((resolve, reject) => {
        this.db.all(sql, (err, results) => {
          if (err) {
            log.error(`Error running sql ${sql}`);
            log.error(err);
            reject(err)
          } else {
            let arr = [];
            results.forEach(result => arr.push(result));
            resolve(arr)
          }
        })
      })
    }

    allWhere(sql, params) {
      return new Promise((resolve, reject) => {
        this.db.all(sql, params, (err, results) => {
          if (err) {
            log.error(`Error running sql ${sql}`);
            log.error(err);
            reject(err)
          } else {
            let arr = [];
            results.forEach(result => arr.push(result));
            resolve(arr)
          }
        })
      })
    }
  }
  
  module.exports = AppDAO