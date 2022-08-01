import request from 'supertest';
import { expect } from 'chai';

import app from '../../app.js';
import User from '../../models/user.js';

// const getToken = (tokenString) => {
//   const access_token = tokenString.split(';')[0];
//   const keyPos = access_token.indexOf('access_token');
//   console.log(access_token.substring(keyPos.length() + 1));
//   return access_token.substring(keyPos.length() + 1);
// };

let userId = null;
let token = null;

before(async () => {
  // this.timeout(20000);
  // setTimeout(done, 20000);

  const signupUser = {
    name: 'test11',
    email: 'test11@gmail.com',
    password: '1234'
  };

  // signup user
  const { status } = await request(app)
    .post('/api/auth/signup')
    .set('Accept', 'application/json')
    .send(signupUser);
  if (status !== 200) throw new Error('Could not signup user for user router tests!');

  const { email, ...signinUser } = signupUser;
  // signin user to get user id and tooken for the user router testing
  // const { header, _body } = await request(app)
  const { header, _body } = await request(app)
    .post('/api/auth/signin')
    .set('Accept', 'application/json')
    .send(signinUser);

  const getToken = (tokenString) => {
    const key = 'access_token';
    const access_token = tokenString.split(';')[0];
    const keyPos = access_token.indexOf(key);
    // console.log(access_token.substring(keyPos + key.length + 1));

    return access_token.substring(keyPos + key.length + 1);
  };

  userId = _body._id;
  token = getToken(header['set-cookie'][0]);
  console.log(`********token: ${token}`);

  // return ;
  // setTimeout(done, 20000);
});

after(async () => {
  await User.deleteMany();
});

//   const { _body} = await request(app)
//       .post('/api/auth/signin')
//       .set('Accept', 'application/json')
//       .send(signinUser);

//   const res = await request(app)
//   .post('/api/auth/signin')
//   .set('Accept', 'application/json')
//   .send(signinUser);
// });

describe('POST /api/users/:id', () => {
  const userInfoToUpdate = {
    name: "updated"
  };

  it('pass with valid user id and username to update and response 200 with updated username and email', async () => {

    // const { header, _body, status } = await request(app)
    //   .post('/api/users/')
    expect(false).to.be.equal(true);
  })
});
