/**
 * @param {number} x
 * @return {number}
 * 
 * @jingjiejiang May 23, 2019
 */
var reverse = function (x) {

    var y = Math.abs(x);
    var result = 0;
    while (y !== 0) {
        result = result * 10 + y % 10;
        y = parseInt(y / 10);
    }
    x > 0 ? result = result : result = -result;
    if (result > 2147483647 || result < -2147483648) return 0;

    return result;
};