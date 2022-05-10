/**
 *
 * Creating Restful API for shoutbox.
 *
 * @author jingjiejiang
 * @history May 8, 2022
 *
 */
const auth = require('basic-auth');
const User = require('../models/user');
const Entry = require('../models/entry');

exports.auth = async (req, res, next) => {
  const credentials = auth(req);
  const user = await User.authenUser(credentials.name, credentials.pass, (err) => {
    next(err);
  });

  if (user.name) req.remoteUser = user;
  next();
};

// get(id, cb) get user via id and return user
exports.user = async (req, res, next) => {
  const user = await User.get(req.params.id, (err) => {
    next(err);
  });
  if (!user.id) {
    res.sendStatus(404);
  } else {
    res.json(user);
  }
};

exports.entries = async (req, res, next) => {
  const { from, to } = req.page;
  const entries = await Entry.getRange(from, to, (err) => next(err));
  res.json(entries);
};
