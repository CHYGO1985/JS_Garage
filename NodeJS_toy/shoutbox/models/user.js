/**
 * 
 * The user model
 * 
 * @author jingjiejiang
 * @history May 5, 2022
 * 
 * May 6, 2022
 * 1.add auth user method
 * 2.add get user via name methods
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
      .then(() => {
        return this.id;
      });
    }
  }

  async update(pass, cb) {
    const id = this.id;
    
    (async () => await this.setId(id, cb))()
    .then(async () => {
      await this.setUser(id, cb);
    });
  }

  // indexes users by name  user:id:Example
  async setId(id, cb) {

    try {
      await db.set(`user:id:${this.name}`, id);
    } catch (err) {
      cb(err);
    }
  }

  // Uses Redis to store the current class’s properties
  async setUser(id, cb) {
    await db.HSET(`user:${id}`, this)
    .catch((err) => cb(err));
  }

  // assign this.pass a hashed password
  async hashPassword(id, cb) {

    this.salt = await bcrypt.genSalt(12).catch((err) => cb(err));
    this.pass = await bcrypt.hash(this.pass, this.salt).catch((err) => cb(err));
  }

  // authenticate user, if match, then return the user
  static async authenUser(name, pass, cb) {
 
    let user = null;
    console.log(`param name: ${name}`)
    user = await this.getByName(name, cb)
    // .then(() => {
    //   console.log(JSON.stringify(user))
    //   if (!user) throw new Error('username does not exist');
    // });
    if (!user) throw new Error('username does not exist');
    const hash = await bcrypt.hash(pass, user.salt).catch((err) => cb(err));  // hash the given pass
    return hash === user.pass ? user : undefined;
  }

  static async getByName(name, cb) {
    const id = await this.getId(name, cb)
    const receivedUser = await User.get(id, cb);
    return receivedUser
  }

  // user:id:Example -> get id
  static async getId(name, cb) {
    return await db.get(`user:id:${name}`, cb);// Gets ID indexed by name
  }

  static async get(id, cb) {
    // let user = (async () => {
    //   user = await db.HGETALL(`user:${id}`);
    // })()
    // .then(() => {
    //   return new User(user);
    // }) 
    // .catch((err) => cb(err));

    // return user;
    const user = await db.HGETALL(`user:${id}`)
      .catch((err) => cb(err));
    return user;
  }
}

module.exports = User; // Exports the User class




