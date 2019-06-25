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
     
    const getComb = (digitsIdx, charArrIdx) => {

        if (curComb.length === digits.length) {
            res.push(curComb.slice().join(""));
            return;
        }

        for (; digitsIdx < digits.length; digitsIdx++) {
            let charArr = numCharMap[digits.charCodeAt(digitsIdx)];
            for (; charArrIdx < charArr.length; charArrIdx++) {
                curComb.push(charArr.charAt(digitsIdx));
                getComb(digitsIdx, charArrIdx + 1);
                curComb.pop();
            }
        }
    }

    getComb(0, 0);

    return res;
};