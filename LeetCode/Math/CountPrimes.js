/**
 * @param {number} n
 * @return {number}
 * 
 * @jingjiejiang May 22, 2019
 */
var countPrimes = function (n) {

    let count = 0, isCount = [];
    for (let i = 2; i < n; i++) {
        if (isCount[i] === undefined) {
            count++;
            for (let j = i; i * j < n; j++) {
                isCount[i * j] = true;
            }
        }
    }

    return count;
};