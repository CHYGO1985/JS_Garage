/**
 *
 * The main js for read and write image data to mysql.
 *
 * @author jingjiejiang
 * @history Jun 2, 2022
 *
 */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');

const indexRouter = require('./middleware/index');
const fileUploadRouter = require('./middleware/upload');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
// for post images files, change it to true
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));
// for uploaded images
app.use(express.static(path.join(__dirname, 'upload')));

// My SQL Connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'userprofile',
});

// eslint-disable-next-line no-unused-vars
pool.getConnection((err, connection) => {
  if (err) throw err; // not connected
  console.log('Connected!');
});

app.get('/', indexRouter(pool));
app.use('/users', usersRouter);
app.post('/', fileUploadRouter(pool));

// app.post('/', (req, res) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('No files were uploaded.');
//   }

//   const { uploadedFile } = req.files;
//   console.log(uploadedFile);
//   const uploadedPath = path.join(__dirname, 'upload', uploadedFile.name);

//   // console.log(uploadedFile);

//   // use mv() to place file on the server
//   uploadedFile.mv(uploadedPath, (err) => {
//     if (err) res.status(500).send(err);

//     pool.getConnection((error, connection) => {
//       if (error) throw error; // not connected
//       console.log('MYSQL Connected');

//       connection.query('UPDATE user SET profile_image = ? where id = "1"', [uploadedFile.name], (err1) => {
//         connection.release();
//         if (!err1) {
//           res.redirect('/');
//         } else {
//           console.log(err1);
//         }
//       });
//     });
//   });

//   return null;
// });

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
