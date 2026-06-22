import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';

import morganMiddleware from './middleware/morgan.js';
import winstonLogger from './config/winston.js';
import createError from './utils/error.js';

import homeRoutes from './features/home/home.routes.js';
import userRoutes from './features/users/user.routes.js';
import authRoutes from './features/auth/auth.routes.js';
import videoRoutes from './features/videos/video.routes.js';
import commentRoutes from './features/comments/comment.routes.js';

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

app.use('/', homeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

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
  });
});

export default app;
