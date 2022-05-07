/**
 * 
 * The route for handling user login.
 * 
 * @author jingjiejiang
 * @history May 7, 2022
 * 
 */
const User = require('../models/user');
const alertWindow = require('alert');

exports.form = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.submit = (req, res, next) => {
  const data = req.body.user;

  let user = (async () => {
    user = await User.authenUser(data.name, data.pass, (err) => alertWindow(`Could not find the user: ${err}`));
  })()
  .then(() => {
    if (user) {
      req.session.uid = user.id;  // save uid for getting user infor
      console.log(`****** login session.uid ${req.session.uid}`)
      res.redirect('/');
    } else {
      alertWindow('Sorry! invalid credentials. ');
      res.redirect('back');
    }
  })
  .catch((err) => next(err));  
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/');
  })
};