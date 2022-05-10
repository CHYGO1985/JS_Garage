/**
 *
 * Route for registration.
 *
 * @author jingjiejiang
 * @history May 6, 2022
 *
 */
const express = require('express');
const alertWindow = require('alert');
const User = require('../models/user');

exports.form = (req, res) => {
  res.render('register', { title: 'Register' });
};

async function getUserByName(username) {
  const user = await User.getByName(username, (err) => {
    alertWindow(err);
  })
    .catch((err) => alertWindow(`Error thrown when get user by name: ${err}`));

  return user;
}

async function createOrSaveUser(existUser, userData, res, req) {
  if (existUser.id) {
    res.error('Username already taken!'); // for req.session.messages
    // alertWindow('Username already taken');
    res.redirect('back');
  } else {
    const newUser = new User({
      name: userData.name,
      pass: userData.pass,
    });
    (async () => {
      await newUser.save((err) => express.next(err));
    })()
      .then(() => {
        req.session.uid = newUser.id; // store uid for auth
        res.redirect('/');
      });
  }
}

exports.submit = (req, res, next) => {
  const userData = req.body.user;
  (async () => {
    const user = await getUserByName(userData.name);
    await createOrSaveUser(user, userData, res, req);
  })()
    .catch((err) => next(err));
};
