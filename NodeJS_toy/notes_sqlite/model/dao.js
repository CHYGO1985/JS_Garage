/**
 *
 * To-list DAO.
 *
 * @author jingjiejiang
 * @history May 13, 2022
 *
 */
const sqlite = require('sqlite3');
// const _ = require('lodash');
const winstonLogger = require('../config/winston');

class TodoListDao {
  constructor(dbFilePath) {
    this.db = new sqlite.Database(dbFilePath, (err) => {
      if (err) {
        winstonLogger.error(`Could not connect to sqlite3 database ${err}`);
      } else {
        winstonLogger.info('Connect to sqlite databse');
      }
    });
  }

  async run(sql, params = []) {
    // eslint-disable-next-line prefer-arrow-callback
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-arrow-callback
      this.db.run(sql, params, function (err) {
        if (err) {
          winstonLogger.error(`Error running sql ${sql} on sqlite: ${err}`);
          reject(err);
        } else {
          resolve({ id: this.lastID });
          winstonLogger.info(`sql ${sql} has been succesfully executed.`);
        }
      });
    });
  }
}

module.exports = TodoListDao;
