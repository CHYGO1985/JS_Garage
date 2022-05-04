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

  static getRange(from, to, cb) {
    db.lRange('entries', from, to, (err, items) => {
      if (err) return cb(err);
      let entries = [];
      items.forEach((item) => {
        entries.push(JSON.parse(item));
      });
      cb(null, entries);
    });
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