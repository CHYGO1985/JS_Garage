/**
 * @param {string} s
 * @return {string}
 * 
 * @jingjiejiang Oct 4, 2019
 */
// two pointers
var shortestPalindrome = function(s) {
    
    let head = 0, n = s.length;
    for (let rear = n - 1; rear >= 0; --rear) {
        if (s.charAt(head) == s.charAt(rear)) ++ head;
    }
    if (head === n) return s;
    let rem = s.substring(head);
    let rem_rev = new StringBuilder(rem).reverse().toString();
    return rem_rev + shortestPalindrome(s.substring(0, head)) + rem;
};