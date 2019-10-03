/**
 * @param {string} str
 * @return {number}
 * 
 * @jingjiejiang Oct 3, 2019
 */
var myAtoi = function(str) {
    
    if (str == null || str.length === 0) return 0;

    const strWithoutSpaces = str.trim();

    let idx = 0, sign = 1, base = 0;
    
    if (idx < strWithoutSpaces.length && 
        (strWithoutSpaces.charAt(idx) === '+' || strWithoutSpaces.charAt(idx) === '-')) {
        sign = strWithoutSpaces.charAt(idx ++) === '-'? -1 : 1;
    }
    
    while (idx < strWithoutSpaces.length && strWithoutSpaces.charAt(idx) >= '0'
        && strWithoutSpaces.charAt(idx) <= '9') {
            if (base > Math.floor(2147483647 / 10) || 
                (base === Math.floor(2147483647 / 10) && parseInt(strWithoutSpaces.charAt(idx)) > 7)) {
                return sign === 1 ? 2147483647 : -2147483648;
            }

            base = base * 10 + parseInt(strWithoutSpaces.charAt(idx ++));
    }

    return sign * base;
};