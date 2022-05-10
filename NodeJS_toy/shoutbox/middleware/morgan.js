/**
 *
 * Config morgan with winston
 *
 * @author jingjiejiang
 * @history MAy 10, 2022
 *
 */
const morgan = require('morgan');
const logger = require('../config/winston');

// Skip all the Morgan http log if the
// application is not running in development mode.
// This method is not really needed here since
// we already told to the logger that it should print
// only warning and error messages in production.
// const skip = () => {
//   const env = process.env.NODE_ENV || 'development';
//   return env !== 'development';
// };

const morganMiddleware = morgan(
  // Define message format string (this is the default one).
  // The message format is made from tokens, and each token is
  // defined inside the Morgan library.
  // You can create your custom token to show what do you want from a request.
  'combined',
  // Options: in this case, I overwrote the stream and the skip logic.
  // See the methods above.
  { stream: logger.stream },
);

module.exports = morganMiddleware;
