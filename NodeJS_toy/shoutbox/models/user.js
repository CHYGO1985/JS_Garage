/**
 * 
 * The user model
 * 
 * @author jingjiejiang
 * @history MAy 5, 2022
 * 
 */
const redis = require('redis');
const bcrypt = require('bcrypt');
const alertWindow = require('alert');
const db = redis.createClient();

(async() => {
  await db.connect();
})();

db.on('connect', () => console.log('Redis Client Connected'));
db.on('error', (err) => console.log('Redis Client Connection Error', err));

class User {
  constructor(obj) {
    for (let key in obj) {  // iterate over the passed-in object
      this[key] = obj[key]; // set each property on the current class
    }
  }

  async save(cb) {
    if (this.id) {
      await this.update('', cb);
    } else {
      this.id = await db.INCR('user:ids');
      const pass = await this.hashPassword(this.id, (err) => {
        alertWindow(`Error thrown: ${err}`);
      });
      await this.update(pass, (err) => {
        alertWindow(`Error thrown: ${err}`);
      })
    }
  }

  async update(pass, cb) {
    const id = this.id;
    
    (async () => await this.setId(id, cb))()
    .then(async () => {
      await this.setUser(id, cb);
    });
  }

  // indexes users by name
  async setId(id, cb) {

    try {
      await db.set(`user:id:${this.name}`, id);
    } catch (err) {
      cb(err);
    }
  }

  // Uses Redis to store the current class’s properties
  async setUser(id, cb) {
    try {
      await db.HSET(`user:${id}`, this);
    } catch (err) {
      cb(err);
    }
  }

  // assign this.pass a hashed password
  async hashPassword(id, cb) {
    let salt = 10;
    try {
      (async () => {
        salt = await bcrypt.genSalt(12); 
      })()
      .then(async () => {
        this.pass = await bcrypt.hash(this.pass, salt);
      });
    } catch (err) {
      cb(err);
    }
  }
}

module.exports = User; // Exports the User class