/**
 * @param {string} s
 * @return {number}
 * 
 * @jingjiejiang Jun 7, 2019
 */
var countSubstrings = function (s) {

    let count = 0;

    const checkPalindrome = (s, left, right) => {

        while (left >= 0 && right < s.length && s[left] == s[right]) {
            count++;
            left--;
            right++;
        }
    }

    for (let idx = 0; idx < s.length; idx++) {
        checkPalindrome(s, idx, idx);
        checkPalindrome(s, idx, idx + 1);
    }

    return count;
};
};