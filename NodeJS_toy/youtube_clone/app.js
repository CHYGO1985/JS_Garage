import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

import morganMiddleware from './middleware/morgan.js';
import winstonLogger from './config/winston.js';
import createError from './utils/error.js';

import indexRouter from './routes/index.js';
import userRouter from './routes/user-route.js';
import authRouter from './routes/auth-route.js';

const app = express();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// view engine setup
app.set('views', path.join(dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(dirname, 'public')));

app.use(morganMiddleware);

dotenv.config();

const mongodbConnect = process.env.NODE_ENV === "test"? 
  process.env.MONGODB_CLOUD_TEST : process.env.MONGODB_CLOUD_PROD;

const dbConnect = async () => {
  try {
    await mongoose.connect(mongodbConnect);
    winstonLogger.info(`Connect to mongodb of ${process.env.NODE_ENV}`);
  } catch (err) {
    winstonLogger.error(`Failed to connect to mongodb due to ${err}`);
  }
};

dbConnect();

app.use('/', indexRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, 'Sorry, it does not exist'));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  winstonLogger.error(`Error ${status} happens due to ${message}`);

  // return render 
  return res.status(status).json({
    success: false,
    status,
    message
  })
});

export default app;
