import request from 'supertest';
import { expect } from 'chai';

import app from '../../app.js';

before(function (done) {
  this.timeout(3000);
  setTimeout(done, 2000);
});