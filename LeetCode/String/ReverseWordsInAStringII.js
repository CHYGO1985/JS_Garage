/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 * 
 * @jingjiejiang Sep 23, 2019
 */
var reverseWords = function(s) {
    
    if (s == null || s.length === 0) return s;
    
    const swap = (s, left, right) => {
        const tmp = s[left];
        s[left] = s[right];
        s[right] = tmp;
    }

    const reverse = (s, start, end) => {
        while (start < end) {
            swap(s, start ++, end --);
        }
    }

    reverse(s, 0, s.length - 1);
    for (let idx = 0; idx < s.length; idx ++) {
        let shift = idx;
        while (shift < s.length && s[shift] !== ' ') {
            shift ++;
        }
        reverse(s, idx, shift - 1);
        idx = shift;
    }
};