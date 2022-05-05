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

  // async save(cb) {
  //   if (this.id) {
  //     await this.update(cb);
  //   } else {
  //     (async() => {
  //      this.id = await db.INCR('user:ids')
  //     })();
  //   }
  // }

  async update(cb) {
    const id = this.id;
    
    (async() => await this.setId(id, cb))()
    .then(() => {
      await setUser(id, cb);
    });
  }

  // indexes users by name
  async setId(id, cd) {

    try {
      await db.set(`user:id:${this.name}`, id)
      .then();
    } catch (err) {
      cb(err);
    }
  }

  // Uses Redis to store the current class’s properties
  async setUser(id, cb) {
    try {
      await db.set(`user:id:${this.name}`, id)
      .then();
    } catch (err) {
      cb(err);
    }
  }
}

module.exports = User; // Exports the User class