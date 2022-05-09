/**
 * 
 * Unit tests.
 * 
 * @author jingjiejiang
 * @history May 9, 2022
 * 
 */
const memdb = require('..');
const assert = require('assert');

describe('memdb', () => {
  beforeEach(() => {
    memdb.clear();    
  });
  describe('.saveSync(doc)', () => {
    it ('should have the document', () => {
      const pet = { name: 'chygo'};
      memdb.saveSync(pet);
      const ret = memdb.first({ name: 'chygo' });
      assert(ret == pet);
    });
  });
  describe('.first(obj)', () => {
    it ('should return the first matching doc', () => {
      const tobi = { name: 'Tobi'};
      const loki = { name: 'Loki'};
      memdb.saveSync(tobi);
      memdb.saveSync(loki);
      let ret = memdb.first({ name: 'Tobi'});
      assert(ret == tobi);
      ret = memdb.first({ name: 'Loki' });
      assert(ret == loki);
    });
    it ('should return null when no doc matches', () => {
      const ret = memdb.first({ name: 'Manny'});
      assert(ret == null);
    });
  });
  // test with async call, get result in call back function
  describe('asyncronous .saved(doc)', () => {
    it ('should save the document', (done) => {
      const pet = { name: 'Tobi' };
      memdb.save(pet, () => {
        const ret = memdb.first({ name: 'Tobi' });
        assert(ret == pet);
        done();
      });
    });
  });
});