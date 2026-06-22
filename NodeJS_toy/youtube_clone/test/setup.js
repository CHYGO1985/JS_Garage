import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { connectDb, disconnectDb } from '../config/db.js';

dotenv.config();

let mongoServer = null;

before(async function beforeAllTests() {
  this.timeout(30000);
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGODB_CLOUD_TEST = mongoServer.getUri();
  await connectDb();
});

after(async function afterAllTests() {
  this.timeout(30000);
  await disconnectDb();
  if (mongoServer) {
    await mongoServer.stop();
  }
});
