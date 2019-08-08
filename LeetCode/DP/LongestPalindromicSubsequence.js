/**
 * @param {string} s
 * @return {number}
 * 
 * @jingjiejiang Aug 8, 2019
 */
var longestPalindromeSubseq = function(s) {
    
    let dp0 = new Array(s.length).fill(0); // values of len = tmpLen
    let dp1 = new Array(s.length).fill(0); // values of len = tmpLen - 1
    let dp2 = new Array(s.length).fill(0); // values of len = tmpLen - 2

    for (let tmpLen = 1; tmpLen <= s.length; tmpLen ++) {
        for (let start = 0; start < s.length - tmpLen; start ++) {

            const end = start + tmpLen - 1;
            if (start === end) {
                dp0[start] = 1;
                continue;
            }

            if (s[start] === s[end])
                dp0[start] = dp2[start + 1] + 2;
            else 
                dp0[start] = Math.max(dp1[start], dp1[start + 1]);
        }
        let temp = dp1;
        dp1 = dp0;
        dp0 = temp;
        temp = dp2;
        dp2 = dp0;
        dp0 = temp;
    }

    return dp1[0]; // after the swap, the values in dp1 are the values in dp0, so use dp1.
};