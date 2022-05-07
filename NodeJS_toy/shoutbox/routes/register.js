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
  (async () => {
    const user = await getUserByName(userData.name);
    await createOrSaveUser(user, userData, res);
  })()
  .catch((err) => next(err));
}

async function getUserByName(username) {
  const user = await User.getByName(username, (err) => {
      alertWindow(err);
    })
    .catch((err) => alertWindow(`Error thrown when get user by name: ${err}`));
  
  return user
}

async function createOrSaveUser(existUser, userData, res) {
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
      console.log(`*** register user id: ${existUser.id}`)
      console.log(`****** register session.uid ${req.session.uid}`)
      console.log(`****** register session ${JSON.stringify(req.session)}`)
      res.redirect('/');
    });
  }
}
