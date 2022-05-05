/**
 * 
 * Model for entry form.
 * 
 * @author jingjiejiang
 * @history May 4, 2022
 * 
 */
const redis = require('redis');
const db = redis.createClient();

(async () => {
  await db.connect();
})();

db.on('connect', () => console.log('Redis Client Connected'));
db.on('error', (err) => console.log('Redis Client Connection Error', err));

// legacy mode
// const redis = require('redis');
// const db = createClient({
//   legacyMode: true
// });
class Entry {
  constructor(obj) {
    for (let key in obj) { // iterate keys in the obj passed
      this[key] = obj[key];
    }
  }

  static async getRange(from, to, cb) {
    let entries = [];

    try {
      let items = await db.LRANGE('entries', from, to);
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
      await db.LPUSH (    // save JSON to Redist lsit        
      'entries',
      entryJSON
      );
    }
    catch (err) {
      cb(err);
    };
  }
}

module.exports = Entry;