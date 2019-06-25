/**
 * @param {string} digits
 * @return {string[]}
 * 
 * @jingjiejiang Jun 25, 2019
 */
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

var letterCombinations = function (digits) {

    let res = [];
    let curComb = [];
    
    if (digits === undefined || digits.length === 0) return res;
     
    const getComb = (digitsIdx, charArrIdx) => {

        if (curComb.length === digits.length) {
            res.push(curComb.slice().join(""));
            return;
        }

        for (; digitsIdx < digits.length; digitsIdx++) {
            let charArr = numCharMap[digits.charAt(digitsIdx) - '0'];
            for (; charArrIdx < charArr.length; charArrIdx++) {
                curComb.push(charArr.charAt(charArrIdx));
                getComb(digitsIdx + 1, 0);
                curComb.pop();
            }
        }
    }

    getComb(0, 0);

    return res;
};