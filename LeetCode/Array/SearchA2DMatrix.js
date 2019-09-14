/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 * 
 * @jingjiejiang Sep 10, 2019
 */
var searchMatrix = function(matrix, target) {
    
    if (matrix == null || matrix.length === 0) return false;

    let rowHead = 0, rowRear = matrix.length - 1;
    
    while (rowHead <= rowRear) {
        const mid = rowHead + Math.floor((rowRear - rowHead) / 2);

        if (matrix[mid][0] === target) return true;
        if (target < matrix[mid][0]) rowRear = mid - 1;
        else rowHead = mid + 1;
    }
    
    if (rowRear < 0) return false;
    let rowIdx = rowRear;
    let colHead = 0, colRear = matrix[0].length - 1;

    while (colHead <= colRear) {
        
        const mid = colHead + Math.floor((colRear - colHead) / 2);
        
        if (matrix[rowIdx][mid] === target) return true;
        if (target < matrix[rowIdx][mid]) colRear = mid - 1;
        else colHead = mid + 1;
    }
    
    return false;
};