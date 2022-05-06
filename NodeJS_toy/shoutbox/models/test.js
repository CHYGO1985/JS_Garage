const User = require('./user');
const alertWindow = require('alert');
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

// test auth user
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

  let res = false;
  (async () => {
    res = await User.authenUser(user.name, user.pass, (err) => {
      alertWindow(`${err}`);
    });
  })()
  .then(() =>{
    console.log(`Is the username and password match? ${res}`);
  });
}
getUser();

