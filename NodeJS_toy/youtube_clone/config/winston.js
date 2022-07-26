/**
 *
 * The configuration file for WinstonJS.
 *
 * @author jingjiejiang
 * @history Jul 20, 2022
 *
 */
import appRoot from 'app-root-path';
import winston from 'winston';
import path from 'path';

const { format, transports } = winston;

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

// define the custom settins for each transport (file, console)
const logger = winston.createLogger({
  level: 'http',
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

logger.stream = {
  write: (message) => logger.http(message),
};

export default logger;
