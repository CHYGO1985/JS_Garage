/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 * 
 * @jingjiejiang May 19, 2019
 */
var rotate = function(nums, k) {
    if (nums === undefined || nums.length < 2) return;

    let count = 0, shift = 0, start = 0;
    let len = nums.length;
    let preNum = nums[shift];

    while (count < nums.length) {
        // if back to original start, start from next one, rest all nums
        if (count > 0 && shift === start) {
            start += 1;
            shift = start;
            preNum = nums[shift];
        }

        // tmp is to keep the num that will be replaced
        let tmp = nums[(shift + k) % len]; 
        nums[(shift + k) % len] = preNum;
        preNum = tmp;
        count++;
        //shift is the next number for moving
        shift = (shift + k) % len;
    }
};