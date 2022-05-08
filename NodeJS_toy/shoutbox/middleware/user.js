/**
 * 
 * check if uid exist in session, if so assign the value to request object of express.
 * 
 * @author jingjiejiang
 * @history May 7, 2022
 * 
 */
const alertWindow = require('alert');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  if (req.remoteUser) {
    res.locals.user = req.remoteUser;
  }

  const uid = req.session.uid;
  if (!uid) return next();
  user = await User.get(uid, (err) => res.error(`Failt to get user by id: ${err}`)); 
  req.user = res.locals.user = user;

  next();
}