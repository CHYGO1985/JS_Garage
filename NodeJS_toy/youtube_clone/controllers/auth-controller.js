const winstonLogger = require('../config/winston');

class AuthController {
  static signup() {
    winstonLogger.info('winston logger is called');
  }

  static two() {
    console.log('two');
  }
}

module.exports = AuthController;
