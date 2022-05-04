/**
 * 
 * Enties route.
 * 
 * @author jingjiejiang
 * @history 
 * 1. May 4, 2022
 * Add export form
 * 
 */

const { title } = require("process");
const Entry = require("../models/entry");

// entry for submitting data 
exports.submit = (req, res, next) => {
  const data = req.body.entry;  // from name = entry[...]
  const user = res.locals.user;
  const username = user ? user.name : null;

  const entry = new Entry({
    username: username,
    title: title,
    body: data.body
  });
  entry.save((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};

exports.form = (req, res) => {
  res.render('post', { title: 'post' });
};