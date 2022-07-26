// const createError = require('../utils/error');
// const User = require('../models/user');

import winstonLogger from '../config/winston.js';

export const test = () => {
  winstonLogger.info('winston logger is called');
};

export const two = () => {
  console.log('two');
};
