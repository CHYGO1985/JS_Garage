const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dotenv = require('dotenv');
// const morgan = require('morgan');
const mongoose = require('mongoose');
const morganMiddleware = require('./middleware/morgan');
const winstonLogger = require('./config/winston');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const notFoundRouter = require('./routes/not-found');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(morganMiddleware);

dotenv.config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CLOUD);
  } catch (err) {
    winstonLogger.error(`Failed to connect to mongodb due to ${err}`);
  }

  winstonLogger.info('Connect to mongodb');
};

dbConnect();

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;
