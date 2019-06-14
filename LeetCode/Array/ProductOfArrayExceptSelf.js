/**
 * @param {number[]} nums
 * @return {number[]}
 * 
 * @jingjiejiang Jun 14, 2019
 */
var productExceptSelf = function (nums) {

    let res = [];
    res[0] = 1;

    for (let idx = 1; idx < nums.length; idx++) {

        res[idx] = res[idx - 1] * nums[idx - 1];
    }

    let rightPatch = 1;

    for (let idx = nums.length - 1; idx >= 0; idx--) {
        res[idx] *= rightPatch;
        rightPatch *= nums[idx];
    }
};
