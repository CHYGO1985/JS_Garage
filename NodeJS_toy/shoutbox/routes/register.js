/**
 * 
 * Route for registration.
 * 
 * @author jingjiejiang
 * @history May 6, 2022
 * 
 */
const express = require("express")
const User = require('../models/user');
const alertWindow = require('alert');

exports.form = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.submit = (req, res, next) => {
  const userData = req.body.user;

  let existUser = (async () => {
    existUser = await User.getByName(userData.name, (err) => {
      alertWindow(err);
    });
  })()
  .then(() => {
    return existUser;
  })
  .catch((err) => alertWindow(`Error thrown when get user by name: ${err}`));
  
  if (existUser.id) {
    alertWindow('Username already taken');
    res.redirect('back');
  } else {
    existUser = new User({
      name: userData.name,
      pass: userData.pass
    });
    (async () => {
      await existUser.save((err) => {
        return next(err);
      });
    })()
    .then(() => {
      req.session.uid = existUser.id; //store uid for auth
      res.redirect('/');
    });
  }
}
