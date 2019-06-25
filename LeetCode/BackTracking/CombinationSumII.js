/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 * 
 * @jingjiejiang Jun 13, 2019
 */
var combinationSum2 = function (candidates, target) {

    let res = [];
    let curComb = [];

    const getComb = (digitsIdx, charArrIdx) => {

        if (curComb.length === digits.length) {
            res.push(curComb.slice().join(""));
            return;
        }

        for (let idx = digitsIdx; idx < digits.length; idx++) {
            let charArr = numCharMap[digits.charAt(idx) - '0'];
            console.log(charArr);
            for (; charArrIdx < charArr.length; charArrIdx++) {
                curComb.push(charArr.charAt(charArrIdx));
                getComb(idx + 1, charArrIdx);
                curComb.pop();
            }
        }
    }

    getComb(0, 0);

    return res;
};