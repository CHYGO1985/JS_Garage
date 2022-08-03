import nock from 'nock';
import axios from 'axios';
import { expect } from 'chai';
import request from 'supertest';

describe('POST /api/users/:id', () => {
  const userInfoToUpdate = {
    name: "updated"
  };
  it('pass with valid user id and username to update and response 200 with updated username and email', async () => {
    const updateUser = async () => {
      return await axios.put('http://test.com/api/users/111', userInfoToUpdate, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json',
          Cookie: 'access_token=test'
        }
      });
    };

    nock('http://test.com')
      .put('/api/users/111')
      .reply(200, {
        name: 'updated',
        email: 'test11@gmail.com'
      });

    const { data, status } = await updateUser();
    expect(status).to.be.equal(200);
    expect(data.name).to.be.equal('updated');
    expect(data.email).to.be.equal('test11@gmail.com');
  });

  it('pass the invalid user id and reponse 403 and correspondent message', async () => {
    const updateUser = async () => {
      let res = null;

      try {
        res = await axios.put('http://test.com/api/users/222', userInfoToUpdate, {
          headers: {
            'Content-Type': 'application/json',
            Cookie: 'access_token=test'
          }
        });
      } catch (err) {
        const { response } = err;
        expect(response.status).to.be.equal(403);
        expect(response.data).to.be.equal('You can only update your account!');
      }
      return res;
    };

    nock('http://test.com/')
      .put('/api/users/222')
      .reply(403, 'You can only update your account!');
  })

  const repeatedUserName = {
    name: "test22"
  };
  it('pass the valid user id and repeated username and reponse 500 and correspondent message', async () => {
    // request('http://test.com')
    //   .put('/api/users/222')
    //   .set('Accept', 'application/json')
    //   .set('Cookie', ['access_token=test'])
    //   .send(repeatedUserName);

    const updateUser = async () => {
      let res = null;

      try {
        res = await request('http://test.com')
          .put('/api/users/222')
          .set('Accept', 'application/json')
          .set('Cookie', ['access_token=test'])
          .send(repeatedUserName);
      } catch (err) {
        const { response } = err;
        expect(response.status).to.be.equal(500);
        expect(response.data).to.be.equal('E11000 duplicate key error collection');
      }
      return res;
    };

    nock('http://test.com/')
      .put('/api/users/222')
      .reply(500, 'E11000 duplicate key error collection');
  })
});

describe('DELETE /api/users/:id', () => {
  it('pass invalid user id and response 403 and correspondent message', async () => {

  });

  it('pass valid user id and response 200 and correspondent message', async () => {
    const deleteUser = async () => {
      return await request('http://test.com')
        .delete('/api/users/111')
        .set('Accept', 'application/json')
        .set('Cookie', ['access_token=test'])
        .send('');
    };

    nock('http://test.com/')
      .delete('/api/users/111')
      .reply(200, 'User has been deleted.');

    const { text, status } = await deleteUser();
    expect(status).to.be.equal(200);
    expect(text).to.be.equal('User has been deleted.');
  });
});

describe('GET /api/users/find/:id', () => {

});