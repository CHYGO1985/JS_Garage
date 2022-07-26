import bcrypt from 'bcrypt';
import winstonLogger from '../config/winston.js';

// class AuthController {
//   async signup(req, res, next) {
//     winstonLogger.info('winston logger is called');
//   }

//   static two() {
//     console.log('two');
//   }
// }

// module.exports = AuthController;

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
  } catch (err) {
    next(err);
  }
};

export const signin = async () => {

};
