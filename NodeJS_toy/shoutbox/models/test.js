const User = require('./user');
const alertWindow = require('alert');
const user = new User({ name: 'Example', pass: 'test' });

user.save((err) => {
  if (err) alertWindow(`Error message: ${err}`);
  console.log('user id %d', user.id);
});