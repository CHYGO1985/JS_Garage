import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

import morganMiddleware from './middleware/morgan.js';
import winstonLogger from './config/winston.js';

import indexRouter from './routes/index.js';
import notFoundRouter from './routes/not-found.js';
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

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CLOUD);
    winstonLogger.info('Connect to mongodb');
  } catch (err) {
    winstonLogger.error(`Failed to connect to mongodb due to ${err}`);
  }
};

dbConnect();

app.use('/', indexRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// catch 404 and forward to error handler
app.use(notFoundRouter);

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message || 'Something went wrong!';
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
