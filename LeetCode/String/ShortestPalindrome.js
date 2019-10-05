/**
 * @param {string} s
 * @return {string}
 * 
 * @jingjiejiang Oct 4, 2019
 */
// two pointers
var shortestPalindrome = function(s) {
    
    let head = 0;

    for (let rear = s.length - 1; rear >= 0; rear --) {
      if (s.charAt(head) === s.charAt(rear)) head ++;
    }

    if (head === s.length) return s;

    let restFromHead = s.substring(head);
    let rest_rev = restFromHead.split("").reverse().join("");
    return rest_rev + shortestPalindrome(s.substring(0, head)) + restFromHead; 
};