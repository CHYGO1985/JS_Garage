/**
 * Definition for knows()
 * 
 * @param {integer} person a
 * @param {integer} person b
 * @return {boolean} whether a knows b
 * knows = function(a, b) {
 *     ...
 * };
 */

/**
 * @param {function} knows()
 * @return {function}
 * 
 * @jingjiejiang Sep 8, 2019
 */
var solution = function(knows) {
  /**
   * @param {integer} n Total people
   * @return {integer} The celebrity
   */
  return function(n) {
      
    let candidate = 0;

    for (let ithPepole = 0; ithPepole < n; ithPepole ++) {
      if (knows(candidate, ithPepole)) candidate = ithPepole;
    }

    for (let idx = 0; idx < candidate; idx ++) {
      if (knows(candidate, idx) || !knows(idx, candidate)) return -1;
    };

    for (let idx = candidate + 1; idx < n; idx ++) {
      if (!knows(idx, candidate)) return -1;
    }

    return candidate;
  };
};