/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
const alertWindow = require('alert');
const User = require('./user');
const { get } = require('./user');

const user = new User({ name: 'Example', pass: 'test' });

// function saveUser() {

//   (async () => {
//     await user.save((err) => {
//       console.log(`Error message: ${err}`);
//     })
//   })()
//   .then(() => {
//     console.log(`User profile: ${JSON.stringify(user)}`);
//   });
// }
// saveUser();

// function getUser() {
//   let returnedUser = '';
//   (async () => {
//     returnedUser = await User.getByName('Example', (err) => {
//       console.log(err);
//     })
//   })()
//   .then(() => {
//     console.log(`***** returned user: ${JSON.stringify(returnedUser)}`);
//   });
// }
// getUser();

// test auth user with match
function getUser() {
  let testUser = new User({ name: 'Example', pass: 'test' }); // match
  let testUser1 = new User({ name: 'Example11', pass: 'test' }); // name not match
  let testUser2 = new User({ name: 'Example', pass: 'test11' }); // pass not match

  let returnedUser = '';
  (async () => {
    returnedUser = await User.getByName('Example', (err) => {
      console.log(err);
    });
  })()
    .then(() => {
      console.log(`***** returned user: ${JSON.stringify(returnedUser)}`);
    });

  let res = null;
  (async () => {
    res = await User.authenUser(testUser.name, testUser.pass, (err) => {
      alertWindow(`${err}`);
    });
  })()
    .then(() => {
      console.log(`Is the username and password match? ${JSON.stringify(res)}`);
    })
    .catch((err) => {
      console.log(`${err}`);
    });
}
getUser();
