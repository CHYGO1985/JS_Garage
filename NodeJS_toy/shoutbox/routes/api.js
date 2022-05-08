/**
 * 
 * Creating Restful API for shoutbox.
 * 
 * @author jingjiejiang
 * @history May 8, 2022
 * 
 */
const auth = require('basic-auth');
const express = require('express');
const User = require('../models/user');

exports.auth = async (req, res, next) => {
  const { name, pass } = auth(req);
  const user = await User.authenUser(name, pass, (err) => {
    next(err);
  });

  if (user.name) req.remoteUser = user;
};