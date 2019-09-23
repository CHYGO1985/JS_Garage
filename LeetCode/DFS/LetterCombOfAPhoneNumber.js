/**
 * @param {string} digits
 * @return {string[]}
 * 
 * @jingjiejiang Sep 23, 2019
 */

var letterCombinations = function(digits) {
    
    const numCharMap = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz'
    };
    
    const res = [];
    if (digits == null || digits.length === 0) return res;

    const findComb = (digIdx, tmpRes) => {
        if (tmpRes.length === digits.length) {
            res.push(tmpRes.slice().join(''));
            return ;
        }

        for (let exIdx = digIdx; exIdx < digits.length; exIdx ++) {
            const charsCandidate = numCharMap[digits.charCodeAt(exIdx) - 48];
            for (let inIdx = 0; inIdx < charsCandidate.length; inIdx ++) {
                tmpRes.push(charsCandidate.charAt(inIdx));
                findComb(exIdx + 1, tmpRes);
                tmpRes.pop();
            }
        }
    };

    findComb(0, new Array());

    return res;
};