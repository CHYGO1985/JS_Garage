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

class Entry {
  constructor(obj) {
    for (let key in obj) { // iterate keys in the obj passed
      this[key] = obj[key];
    }
  }

  save(cb) {
    const entryJSON = JSON.stringify(this); // concert saved entry data to JSON string
    db.lpush (    // save JSON to Redist lsit        
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