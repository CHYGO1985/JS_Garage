import {
  signinUser,
  signinWithGoogleUser,
  signupUser,
} from './auth.service.js';

export const signup = async (req, res, next) => {
  try {
    await signupUser(req.body);
    return res.status(200).send('User has been created!');
  } catch (err) {
    return next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { token, user, cookieOptions } = await signinUser(req.body);

    return res
      .cookie('access_token', token, cookieOptions)
      .status(200)
      .json(user);
  } catch (err) {
    return next(err);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const { token, user, cookieOptions } = await signinWithGoogleUser(req.body);

    return res
      .cookie('access_token', token, cookieOptions)
      .status(200)
      .json(user);
  } catch (err) {
    return next(err);
  }
};
