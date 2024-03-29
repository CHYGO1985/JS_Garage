/**
 *
 * Model for entry form.
 *
 * @author jingjiejiang
 * @history May 4, 2022
 *
 */
const redis = require('redis');
const logger = require('../config/winston');

const db = redis.createClient();
(async () => {
  await db.connect();
})();

db.on('connect', () => logger.info('Redis Client Connected'));
db.on('error', (err) => logger.error('Redis Client Connection Error: %s', err));

// legacy mode
// const redis = require('redis');
// const db = createClient({
//   legacyMode: true
// });
class Entry {
  constructor(obj) {
    const keys = Object.keys(obj);
    // iterate keys in the obj passed
    for (let idx = 0; idx < keys.length; idx += 1) {
      this[keys[idx]] = obj[keys[idx]];
    }

    // for (const key in obj) {
    //   if (key) {
    //     this[key] = obj[key];
    //   }
    // }
  }

  static async getRange(from, to, cb) {
    const entries = [];

    try {
      const items = await db.LRANGE('entries', from, to);
      items.forEach((item) => {
        entries.push(JSON.parse(item));
      });
    } catch (err) {
      cb(err);
    }
    return entries;
  }

  async save(cb) {
    const entryJSON = JSON.stringify(this); // concert saved entry data to JSON string

    try {
      await db.LPUSH( // save JSON to Redist lsit
        'entries',
        entryJSON,
      );
    } catch (err) {
      cb(err);
    }
  }

  static async count() {
    let listLen = 0;
    try {
      listLen = await db.LLEN('entries');
    } catch (err) {
      // log error in the future
    }

    return listLen;
  }
}

module.exports = Entry;
