/**
 * @param {number} num
 * @return {string}
 * 
 * @jingjiejiang Jun 24, 2019
 */
const mappings = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
];

var intToRoman = function (num) {

    let res = [];

    mappings.forEach((mapping) => {

        const [val, chars] = mapping;

        if (num >= val) {
            while (num >= val) {
                num -= val;
                res.push(chars);
            }
        }
    });

    return res.join("");
};