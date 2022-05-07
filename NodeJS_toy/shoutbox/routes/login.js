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

  let user = null;
  (async () => {
    user = await User.authenUser(data.name, data.pass, (err) => res.error(`Could not find the user: ${err}`));
    if (user.name) {
      req.session.uid = user.id;  // save uid for getting user infor
      console.log(`****** login session.uid ${req.session.uid}`)
      res.redirect('/');
    } else {
      res.error('Sorry! invalid credentials. ');
      res.redirect('back');
    }
  })()
  .catch((err) => {
    res.error(err.message);
    res.redirect('back');
  });  
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/');
  })
};