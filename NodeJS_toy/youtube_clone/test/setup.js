import dotenv from 'dotenv';

import { connectDb, disconnectDb } from '../config/db.js';

dotenv.config();

before(async function beforeAllTests() {
  this.timeout(20000);
  await connectDb();
});

after(async function afterAllTests() {
  this.timeout(10000);
  await disconnectDb();
});
