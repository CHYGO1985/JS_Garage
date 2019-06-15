/**
 * @param {number[]} height
 * @return {number}
 * 
 * @jingjiejiang June 15, 2019
 */
var trap = function (height) {

    let left = 0;
    let right = height.length - 1;
    let sum = 0;

    while (left < right && height[left] <= height[left + 1]) left++;
    while (left < right && height[right] <= height[right - 1]) right--;

    while (left < right) {

        const leftPivot = height[left];
        const rightPivot = height[right];

        // is "=" necesssary?
        if (left <= right) {

            while (left < right && leftPivot >= height[++left]) {
                sum += leftPivot - height[left];
            }
        } else {

            while (left < right && height[--right] <= rightPivot) {
                sum += rightPivot - height[right];
            } 
        }
    }

    return sum;
};