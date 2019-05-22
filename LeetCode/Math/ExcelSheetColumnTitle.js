/**
 * @param {number} n
 * @return {string}
 * 
 * @jingjiejiang May 22, 2019
 */
var convertToTitle = function (n) {

    //if (n < 27) {
    //    return String.fromCharCode((n - 1) % 26 + 65);
    //} else {
    //    return convertToTitle(Math.floor(n - 1) / 26) + String.fromCharCode((n - 1) % 26 + 65);
    //}

    return n < 27 ? String.fromCharCode((n - 1) % 26 + 65)
        : convertToTitle(Math.floor(n - 1) / 26) + String.fromCharCode((n - 1) % 26 + 65);
};    