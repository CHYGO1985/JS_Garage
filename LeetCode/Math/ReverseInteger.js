/**
 * @param {number} x
 * @return {number}
 * 
 * @jingjiejiang May 23, 2019
 */
var reverse = function (x) {

    // var y = Math.abs(x);
    // var result = 0;
    // while (y !== 0) {
    //     result = result * 10 + y % 10;
    //     y = parseInt(y / 10);
    // }
    // x > 0 ? result = result : result = -result;
    // if (result > 2147483647 || result < -2147483648) return 0;

    // return result;
    if (x === 0) return 0;
    let val = Math.abs(x);
    if (val.toString(2).length > 31) return 0;
    let revValStr = val.toString().split("").reverse();
    while (revValStr[0] === 0) {
        revValStr.splice(0, 1);
    }

    val = Number(revValStr.join(""));
    if (val.toString(2).length > 31) return 0;

    return x > 0 ? y : -y;
};