const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const winstonLogger = require('./config/winston');
const entries = require('./routes/entries');
const register = require('./routes/register');
const login = require('./routes/login');
const api = require('./routes/api');
const validate = require('./middleware/validate');
const messages = require('./middleware/messages');
const user = require('./middleware/user');
const Entry = require('./models/entry');
const page = require('./middleware/page');
const morganMiddleware = require('./middleware/morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(morgan('combined', { stream: logger.stream }));
app.use(morganMiddleware);
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());
app.use(cookieParser());
// add session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));
app.use(messages);

app.use('/api', api.auth);
app.get('/api/user/:id', api.user);
app.post('/api/entry', entries.submit);
app.get('/api/entries/:page?', page(Entry.count), api.entries);
app.use(user);

// app.use('/', entries.list);
// app.use('/users', usersRouter);

app.get('/', entries.list);
app.get('/post', entries.form);
app.post(
  '/post',
  validate.required('entry[title]'),
  validate.lengthAbove('entry[title]', 4),
  entries.submit,
);
app.get('/register', register.form);
app.post('/register', register.submit);
app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // add this line to include winston logging
  winstonLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
