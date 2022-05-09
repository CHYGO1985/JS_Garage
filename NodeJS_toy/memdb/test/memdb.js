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
  describe('.saveSync(doc)', () => {
    it ('should have the document', () => {
      const pet = { name: 'chygo'};
      memdb.saveSync(pet);
      const ret = memdb.first({ name: 'chygo' });
      assert(ret == pet);
    });
  });
});