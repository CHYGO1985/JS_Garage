/**
 * @param {number} n
 * @return {number[][]}
 * 
 * @jingjiejiang Aug 30, 2019
 */
var generateMatrix = function(n) {
    
    let startPnt = 0, minLimit = 0, maxLimit = n - 1, eleNum = 1;
    const res = [...Array(n)].map(ele => Array(n));

    while (maxLimit >= 0) {

        // adjust paraments for each circle
        let rowIdx = startPnt, colIdx = startPnt;
        maxLimit = maxLimit - minLimit;

        // for limit = 0, like n = 1
        if (maxLimit === 0) res[rowIdx][colIdx] = eleNum;

        // Row: from top left to top right
        for (; colIdx < maxLimit; colIdx ++) {
            res[rowIdx][colIdx] = eleNum ++;
        }

        // Col: from top right to bottom right
        for (; rowIdx < maxLimit; rowIdx ++) {
            res[rowIdx][colIdx] = eleNum ++;
        }

        // Row: from bottom right to left corner 
        for (; colIdx > minLimit;  colIdx --) {
            res[rowIdx][colIdx] = eleNum ++;
        }

        // Col: left corner to top left
        for (; rowIdx > minLimit; rowIdx --) {
            res[rowIdx][colIdx] = eleNum ++;
        }

        minLimit + 1;
        maxLimit - 1;
        startPnt ++;
    }

    return res;
};