/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 * 
 * @jingjiejiang Jun 13, 2019
 */
var combinationSum3 = function(k, n) {
    
    let res = [];
    let tmpRes = [];
    let start = 1;

    const getComb = (k, n, start) => {

        if (k < 0 || (k == 0 && n != 0)) return ;
        if (k == 0 && n == 0) {
            res.push(tmpRes.slice());
            return;
        }

        for (let num = start; num <= 9; num ++) {
            tmpRes.push(num);
            k -= 1;
            getComb(k, n - num, num + 1);
            k += 1;
            tmpRes.pop();
        }
    };

    getComb(k, n, 1);

    return res;
};