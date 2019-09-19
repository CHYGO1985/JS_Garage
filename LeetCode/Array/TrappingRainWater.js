/**
 * @param {number[]} height
 * @return {number}
 * 
 * @jingjiejiang June 15, 2019
 */
var trap = function (height) {

    let left = 0, right = height.length - 1, sum = 0;

    while (left < right) {

        const min = Math.min(height[left], height[right]);

        if (height[left] === min) {

            while (left < right && height[++left] > min) {
                sum += height[left] - min;
            }
        } else {

            while (left < right && height[--right] > min) {
                sum += height[right] - min;
            }
        }
    };

    return sum;
};