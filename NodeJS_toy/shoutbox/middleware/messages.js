/**
 * 
 * Put locals.messages data to session to avoid loss during redirecting.
 * 
 * @author jingjiejiang
 * @history May 6, 2022
 * 
 */
const express = require('express');

function message(req) {
  return (msg, type) => {
    type = type || 'info';
    let session = req.session;
    session.messages = session.messages || [];
    session.messages.push({ type: type, string: msg });
  };
};

module.exports = (req, res, next) => {
  res.message = message(req);
  res.error = (msg) => {
    return res.message(msg, 'error');
  };
  res.locals.messages = req.session.messages || [];
  res.locals.removeMessages = () => {
    req.session.messages = [];
  };
  next();
};