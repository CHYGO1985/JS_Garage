// const User = require('../models/user');

import winstonLogger from '../config/winston.js';
import User from '../models/user.js';
import createError from '../utils/error.js';

export const test = () => {
  res.status(200);
  winstonLogger.info('winston logger is called');
};

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, 'You can only update your account!'));
  }
};

export const deleteUser = () => {

};

export const getUser = () => {

};

export const subscribe = () => {

};

export const unsubscribe = () => {

};

export const like = () => {

};

export const dislike = () => {

};