/**
 * @param {string} s
 * @return {number}
 * 
 * @jingjiejiang Sep 30, 2019
 */
var lengthOfLongestSubstring = function(s) {
    
  if (s == null || s.length === 0) return 0;

  let maxLen = 0, left = -1;
  const charIdxMap = [...Array(256)].map(_ => -1);

  for (let idx = 0; idx < s.length; idx ++) {
    left = Math.max(left, charIdxMap[s.charCodeAt(idx)]);
    charIdxMap[s.charCodeAt(idx)] = idx;
    // do not need to use idx - left + 1
    // if there is no repeat, then left = -1, no need to plus +1
    // if there is repeat, the current pos does not count
    maxLen = Math.max(maxLen, idx - left);
  }

  return maxLen;
};