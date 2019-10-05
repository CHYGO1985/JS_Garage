/**
 * @param {string} s
 * @return {string}
 * 
 * @jingjiejiang Oct 4, 2019
 */
// two pointers
// var shortestPalindrome = function(s) {
    
//     let head = 0;

//     for (let rear = s.length - 1; rear >= 0; rear --) {
//       if (s.charAt(head) === s.charAt(rear)) head ++;
//     }

//     if (head === s.length) return s;

//     let restFromHead = s.substring(head);
//     let rest_rev = restFromHead.split("").reverse().join("");
//     return rest_rev + shortestPalindrome(s.substring(0, head)) + restFromHead; 
// };
var shortestPalindrome = function(s) {
  
  const oriStr = s;
  const newStr = s.split("").reverse().join("") + "#" + oriStr;

  const getKMPNextArr = (str) => {
    const next = [...Array(str.length)].fill(0);  
    let prefix = -1, suffix = 0;
    next[suffix] = prefix;
    
    while (suffix < str.length - 1) {
      if (prefix === -1 || str.charAt(prefix) === str.charAt(suffix)) {
        prefix ++;
        suffix ++;
        next[suffix] = prefix;
      } else {
        prefix = next[prefix];
      }
    }

    return next;
  };

  const nextsArr = getKMPNextArr(newStr);
  // get those substrings could not match with prefix
  let patch = oriStr.substring(nextsArr[nextsArr.length - 1] + 1);
  patch = patch.split("").reverse().join("");
   
  return patch + oriStr;
};