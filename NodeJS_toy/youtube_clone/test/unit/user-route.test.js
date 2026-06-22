import { expect } from 'chai';

import User from '../../models/user.js';
import {
  deleteUser,
  getUser,
  updateUser,
} from '../../features/users/user.controller.js';

const originalUserMethods = {
  findById: User.findById,
  findByIdAndDelete: User.findByIdAndDelete,
  findByIdAndUpdate: User.findByIdAndUpdate,
};

const createRes = () => {
  const res = {};

  res.status = (statusCode) => {
    res.statusCode = statusCode;
    return res;
  };

  res.json = (body) => {
    res.body = body;
    return res;
  };

  return res;
};

const createNext = () => {
  const errors = [];
  const next = (err) => {
    errors.push(err);
  };

  next.errors = errors;
  return next;
};

const restoreUserModel = () => {
  User.findById = originalUserMethods.findById;
  User.findByIdAndDelete = originalUserMethods.findByIdAndDelete;
  User.findByIdAndUpdate = originalUserMethods.findByIdAndUpdate;
};

afterEach(() => {
  restoreUserModel();
});

describe('user-controller unit tests', () => {
  describe('updateUser', () => {
    it('updates the authenticated user and returns the updated document', async () => {
      const req = {
        params: { id: 'user-1' },
        user: { id: 'user-1' },
        body: { name: 'updated' },
      };
      const res = createRes();
      const next = createNext();
      const updatedUser = {
        _id: 'user-1',
        name: 'updated',
        email: 'test11@gmail.com',
      };
      let receivedArgs = null;

      User.findByIdAndUpdate = async (...args) => {
        receivedArgs = args;
        return updatedUser;
      };

      await updateUser(req, res, next);

      expect(receivedArgs).to.deep.equal([
        'user-1',
        { $set: { name: 'updated' } },
        { new: true },
      ]);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.deep.equal(updatedUser);
      expect(next.errors).to.be.empty;
    });

    it('rejects updates for another user before touching the model', async () => {
      const req = {
        params: { id: 'user-2' },
        user: { id: 'user-1' },
        body: { name: 'updated' },
      };
      const res = createRes();
      const next = createNext();
      let wasCalled = false;

      User.findByIdAndUpdate = async () => {
        wasCalled = true;
      };

      await updateUser(req, res, next);

      expect(wasCalled).to.equal(false);
      expect(next.errors).to.have.lengthOf(1);
      expect(next.errors[0].status).to.equal(403);
      expect(next.errors[0].message).to.equal('You can only update your account!');
      expect(res.statusCode).to.equal(undefined);
    });

    it('forwards model errors to Express', async () => {
      const req = {
        params: { id: 'user-1' },
        user: { id: 'user-1' },
        body: { name: 'updated' },
      };
      const res = createRes();
      const next = createNext();
      const dbError = new Error('db failure');

      User.findByIdAndUpdate = async () => {
        throw dbError;
      };

      await updateUser(req, res, next);

      expect(next.errors).to.deep.equal([dbError]);
      expect(res.statusCode).to.equal(undefined);
    });
  });

  describe('deleteUser', () => {
    it('deletes the authenticated user and returns the success message', async () => {
      const req = {
        params: { id: 'user-1' },
        user: { id: 'user-1' },
      };
      const res = createRes();
      const next = createNext();
      let deletedUserId = null;

      User.findByIdAndDelete = async (userId) => {
        deletedUserId = userId;
      };

      await deleteUser(req, res, next);

      expect(deletedUserId).to.equal('user-1');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.equal('User has been deleted.');
      expect(next.errors).to.be.empty;
    });

    it('rejects deletes for another user before touching the model', async () => {
      const req = {
        params: { id: 'user-2' },
        user: { id: 'user-1' },
      };
      const res = createRes();
      const next = createNext();
      let wasCalled = false;

      User.findByIdAndDelete = async () => {
        wasCalled = true;
      };

      await deleteUser(req, res, next);

      expect(wasCalled).to.equal(false);
      expect(next.errors).to.have.lengthOf(1);
      expect(next.errors[0].status).to.equal(403);
      expect(next.errors[0].message).to.equal('You can only delete your account!');
      expect(res.statusCode).to.equal(undefined);
    });

    it('forwards delete errors to Express', async () => {
      const req = {
        params: { id: 'user-1' },
        user: { id: 'user-1' },
      };
      const res = createRes();
      const next = createNext();
      const dbError = new Error('delete failed');

      User.findByIdAndDelete = async () => {
        throw dbError;
      };

      await deleteUser(req, res, next);

      expect(next.errors).to.deep.equal([dbError]);
      expect(res.statusCode).to.equal(undefined);
    });
  });

  describe('getUser', () => {
    it('returns the requested user document', async () => {
      const req = { params: { id: 'user-1' } };
      const res = createRes();
      const next = createNext();
      const user = {
        _id: 'user-1',
        name: 'test11',
        email: 'test11@gmail.com',
      };

      User.findById = async (userId) => {
        expect(userId).to.equal('user-1');
        return user;
      };

      await getUser(req, res, next);

      expect(res.statusCode).to.equal(200);
      expect(res.body).to.deep.equal(user);
      expect(next.errors).to.be.empty;
    });

    it('forwards read errors to Express', async () => {
      const req = { params: { id: 'user-1' } };
      const res = createRes();
      const next = createNext();
      const dbError = new Error('read failed');

      User.findById = async () => {
        throw dbError;
      };

      await getUser(req, res, next);

      expect(next.errors).to.deep.equal([dbError]);
      expect(res.statusCode).to.equal(undefined);
    });
  });
});
