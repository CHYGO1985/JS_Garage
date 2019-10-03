/**
 * @param {string} s
 * @return {number}
 * 
 * @jingjiejiang Jun 7, 2019
 */
// var countSubstrings = function (s) {

//     let count = 0;

//     const checkPalindrome = (s, left, right) => {

//         while (left >= 0 && right < s.length && s[left] == s[right]) {
//             count++;
//             left--;
//             right++;
//         }
//     }

//     for (let idx = 0; idx < s.length; idx++) {
//         checkPalindrome(s, idx, idx);
//         checkPalindrome(s, idx, idx + 1);
//     }

//     return count;
// };

/* DP */
var countSubstrings = function(s) {
    
  let count = 0;
  if (s == null || s.length === 0) return 0;

  const palinArr = [...Array(s.length)].fill(0).map(_ => [...Array(s.length)].fill(0));

  for (let rightIdx = 0; rightIdx < s.length; rightIdx ++) {
    palinArr[rightIdx][rightIdx] = 1;
    count ++;
    for (let leftIdx = 0; leftIdx < rightIdx; leftIdx ++) {
      palinArr[leftIdx][rightIdx] = (s.charAt(leftIdx) === s.charAt(rightIdx)
        && (rightIdx - leftIdx < 2 || palinArr[leftIdx + 1][rightIdx - 1]));

      if (palinArr[leftIdx][rightIdx]) count ++;
    }
  }

  return count;
};