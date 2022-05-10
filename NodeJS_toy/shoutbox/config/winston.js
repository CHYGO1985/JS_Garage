/**
 *
 * The configuration file for WinstonJS.
 *
 * @author jingjiejiang
 * @history May 10, 2022
 *
 */
const appRoot = require('app-root-path');
const { createLogger, format, transports } = require('winston');
const path = require('path');

// define the custom settins for each transport (file, console)
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
    format.json(),
  ),
  defaultMeta: { service: 'quickpost' },
  transports: [
    new transports.File({ filename: path.join(appRoot.toString(), '/logs/error.log'), level: 'error' }),
    new transports.File({ filename: path.join(appRoot.toString(), '/logs/combined.log') }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      // print all the message colored
      format.colorize({ all: true }),
      format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
      ),
      format.simple(),
    ),
  }));
}

module.exports = logger;
