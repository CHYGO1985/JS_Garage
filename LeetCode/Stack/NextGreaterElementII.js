/**
 * @param {number[]} nums
 * @return {number[]}
 * 
 * @jingjiejiang Jun 21, 2019
 * // further test [1,2,3,4,3]
 */
var nextGreaterElements = function (nums) {

    let stack = [];
    let res = [];
    let resIdx = 0;
    nums = nums.concat(nums)

    nums.forEach((num, idx) => {

        
        res[resIdx] = -1;

        while (stack.length > 0 && num > nums[stack[stack.length - 1]]) {
            res[--shiftIdx] = num;
            stack.pop();
        }
        stack.push(idx);
        resIdx++;
    });

    res.slice(res.length / 2);

    return res;
};