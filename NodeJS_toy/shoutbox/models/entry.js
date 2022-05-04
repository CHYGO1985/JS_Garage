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
    const entries = [];
    console.log("***** get range");
    try {
      const items = await db.lrange('entries', from, to);
      let entries = [];
      items.forEach((item) => {
        entries.push(JSON.parse(item));
      });
    } catch (err) {
      cb(err);
    }
    // db.LRANGE('entries', from, to, (err, items) => {
    //   if (err) return cb(err);
    //   console.log(`****${JSON.stringify(items)}`);
    //   console.log("***** anything happen");
      
    //   cb(null, entries);
    // });
    console.log(`******${JSON.stringify(items)}`);
    return entries;
  }

  save(cb) {
    const entryJSON = JSON.stringify(this); // concert saved entry data to JSON string
    db.LPUSH (    // save JSON to Redist lsit        
      'entries',
      entryJSON,
      (err) => {
        if (err) return cb(err);
        cb();
      }
    );
  }
}

module.exports = Entry;