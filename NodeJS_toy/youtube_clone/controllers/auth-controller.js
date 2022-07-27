import bcrypt from 'bcrypt';
import winstonLogger from '../config/winston.js';

import User from '../models/user.js';

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
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send('User has been created!');
  } catch (err) {
    next(err);
  }
};

export const signin = async () => {

};
