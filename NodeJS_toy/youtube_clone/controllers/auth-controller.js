import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import winstonLogger from '../config/winston.js';
import createError from '../utils/error.js';
import User from '../models/user.js';

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send('User has been created!');
    winstonLogger.info(`A new user has been sign in`);
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, 'User not found!'));

    const isPwdCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPwdCorrect) return next(createError(400, 'Username or password is not correct!'));

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    // do not send pwd to user
    const { password, ...userInfo } = user._doc;

    res.cookie('access_token', token, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true
    })
    .status(200)
    .json(userInfo);
    // .send({ userInfo, token })
  } catch(err) {
    next(err);
  }
};
