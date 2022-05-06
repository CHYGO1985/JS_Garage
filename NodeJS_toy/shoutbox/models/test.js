const User = require('./user');
const alertWindow = require('alert');
const { get } = require('./user');
const user = new User({ name: 'Example', pass: 'test' });

// user.save((err) => {
//   if (err) console.log(`Error message: ${err}`);
//   console.log('user id %d', user.id);
// });

function getUser() {
  let returnedUser = '';
  (async () => {
    returnedUser = await User.getByName('Example', (err) => {
      console.log(err);
    })
  })()
  .then(() => {
    console.log(`***** returned user: ${JSON.stringify(returnedUser)}`);
  });
}

getUser();

