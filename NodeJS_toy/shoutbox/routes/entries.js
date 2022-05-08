/**
 * 
 * Enties route.
 * 
 * @author jingjiejiang
 * @history 
 * 1. May 4, 2022
 * Add export form, submit, list
 * 
 */

const { title } = require("process");
const Entry = require("../models/entry");

// entry for submitting data 
exports.submit = (req, res, next) => {
  const data = req.body.entry;  // from name = entry[...]
  const user = res.locals.user;
  let username = user ? user.name
    : (req.remoteUser.name ? req.remoteUser.name : null);

  const entry = new Entry({
    username: username,
    title: data.title,
    body: data.body
  });

  (async() => {
    await entry.save((err) => {
      if (err) return next(err);
    });
  })()
  .then(() => {      
    if (req.remoteUser) { // for adding post via REST API
      res.json({ message: 'Entry added.' });
    } else {
      res.redirect('/');
    }
  });
};

exports.form = (req, res) => {
  res.render('post', { title: 'post' });
};

// rendering a list of entries
exports.list = (req, res, next) => {

  // test data
  // const data = [
  //   {
  //     title: "1",
  //     body: "lalala",
  //     username: "JJJ"
  //   }
  // ];
  // console.log("**** list route");
  // res.render('entries', {
  //   title: 'Entries',
  //   entries: data
  // });
  
  let entries = [];
  (async () => {
    entries = await Entry.getRange(0, -1, (err) => {
      if (err) return next(err);
    });
  })()
  .then(() => {
    res.render('entries', {
      title: 'Entries',
      entries: entries
    });
  });
};
