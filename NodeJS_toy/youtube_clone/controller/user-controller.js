// const createError = require('../utils/error');
// const User = require('../models/user');

const winstonLogger = require('../config/winston');

class UserController {
  static test() {
    winstonLogger.info('winston logger is called');
  }

  static two() {
    console.log('two');
  }
}

module.exports = UserController;
