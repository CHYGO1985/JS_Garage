import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import winstonLogger from '../../config/winston.js';
import User from '../../models/user.js';
import createError from '../../utils/error.js';

const createAccessToken = (userId) => jwt.sign({ id: userId }, process.env.JWT);

const toPublicUser = (userDoc) => {
  const user = userDoc.toObject ? userDoc.toObject() : userDoc;
  const { password, ...userInfo } = user;
  return userInfo;
};

export const signupUser = async (userPayload) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(userPayload.password, salt);
  const newUser = new User({ ...userPayload, password: hash });

  const savedUser = await newUser.save();
  winstonLogger.info('A new user has been sign in');
  return savedUser;
};

export const signinUser = async ({ name, password }) => {
  const user = await User.findOne({ name });
  if (!user) {
    throw createError(404, 'User not found!');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw createError(400, 'Username or password is not correct!');
  }

  return {
    token: createAccessToken(user._id),
    user: toPublicUser(user),
    cookieOptions: {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    },
  };
};

export const signinWithGoogleUser = async (userPayload) => {
  let user = await User.findOne({ email: userPayload.email });

  if (!user) {
    const newUser = new User({
      ...userPayload,
      fromGoogle: true,
    });
    user = await newUser.save();
  }

  return {
    token: createAccessToken(user._id),
    user: toPublicUser(user),
    cookieOptions: {
      httpOnly: true,
    },
  };
};
