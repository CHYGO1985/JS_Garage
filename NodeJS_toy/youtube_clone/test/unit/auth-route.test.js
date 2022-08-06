import nock from 'nock';
import axios from 'axios';
import { expect } from 'chai';

/**
 * Test /api/auth/signup endpoint
 */
describe('POST signup', () => {
  const tmpUser = {
    name: 'testaa',
    email: 'testaa@gmail.com',
    password: '1234'
  };

  it('post a new user and respond with 200 and a msg showes that user has been created', async () => {
    const signupUser = async () => {
      return await axios.post('http://test.com/api/auth/signup', tmpUser, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json',
        }
      });
    };

    nock('http://test.com')
      .post('/api/auth/signup', body => {
        expect(body.name).to.be.equal('testaa');
        expect(body.email).to.be.equal('testaa@gmail.com');
        expect(body.password).to.be.equal('1234');
        return true;
      })
      .reply(200, 'User has been created!');

    const { data, status } = await signupUser();
    expect(status).to.be.equal(200);
    expect(data).to.be.equal('User has been created!')
  });

  const dupUserName = {
    name: 'testaa',
    email: 'test22@gmail.com',
    password: '1234'
  };
  it.only('post duplicate user name and respone with 500 and a msg showes that duplicate key error', async () => {
    const signupUser = async () => {
      let res = null;
      try {
        res = await axios.post('http://test.com/api/auth/signup', dupUserName, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            'Content-Type': 'application/json',
          }
        });
      } catch (err) {
        const { response } = err;
        expect(response.status).to.be.equal(500);
        expect(response.data).to.be.equal('E11000 duplicate key error collection');
      };

      return res;
    };

    nock('http://test.com')
      .post('/api/auth/signup', body => {
        expect(body.name).to.be.equal('testaa');
        expect(body.email).to.be.equal('test22@gmail.com');
        expect(body.password).to.be.equal('1234');
        return true;
      })
      .reply(500, 'E11000 duplicate key error collection');

    await signupUser();
  });

  const dupUserEmail = {
    name: 'test22',
    email: 'testaa@gmail.com',
    password: '1234'
  };
  it('post duplicate user email and respone with 500 and a msg showes that duplicate key error', async () => {
    const signupUser = async () => {
      let res = null;
      try {
        res = await axios.post('http://test.com/api/auth/signup', dupUserEmail, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            'Content-Type': 'application/json',
          }
        });
      } catch (err) {
        const { response } = err;
        expect(response.status).to.be.equal(500);
        expect(response.data).to.be.equal('E11000 duplicate key error collection');
      };

      return res;
    };

    nock('http://test.com')
      .post('/api/auth/signup')
      .reply(500, 'E11000 duplicate key error collection');

    await signupUser();
  });
});

/**
 * Test /api/auth/signin endpoint
 */
describe('POST signin', () => {
  const signinUser = {
    name: 'testaa',
    password: '1234'
  };
  it('post valid username and password and response with 200 and username and user email', async () => {

    const signinUser = async () => {
      return await axios.post('http://test.com/api/auth/signin', signinUser, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json',
        }
      })
    };

    nock('http://test.com')
      .post('/api/auth/signin')
      .reply(200, {
        name: 'testaa',
        email: 'testaa@gmail.com'
      })

    const { data, status } = await signinUser();
    expect(status).to.be.equal(200);
    expect(data.name).to.be.equal('testaa');
    expect(data.email).to.be.equal('testaa@gmail.com');
  });

  const signinUser1 = {
    name: 'testbb',
    password: '1234'
  };
  it('post invalid username and response with 404 and a msg showes that user is not found', async () => {
    const signinUser = async () => {
      let res = null;
      try {
        res = await axios.post('http://test.com/api/auth/signin', signinUser1, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            'Content-Type': 'application/json',
          }
        });
      } catch (err) {
        const { response } = err;
        expect(response.status).to.be.equal(404);
        expect(response.data).to.be.equal('User not found!');
      }
      return res;
    };

    nock('http://test.com')
      .post('/api/auth/signin')
      .reply(404, 'User not found!');

    await signinUser();
  });

  const signinUser2 = {
    name: 'testaa',
    password: '1234567'
  };
  it('post invalid password and response with 404 and a msg showes that username or password is not correct', async () => {
    const signinUser = async () => {
      let res = null;
      try {
        res = await axios.post('http://test.com/api/auth/signin', signinUser2, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            'Content-Type': 'application/json',
          }
        });
      } catch (err) {
        const { response } = err;
        expect(response.status).to.be.equal(404);
        expect(response.data).to.be.equal('Username or password is not correct!');
      }
      return res;
    };

    nock('http://test.com')
      .post('/api/auth/signin')
      .reply(404, 'Username or password is not correct!');

    await signinUser();
  });
});
