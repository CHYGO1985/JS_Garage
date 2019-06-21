/**
 * @param {number[]} nums
 * @return {number[]}
 * 
 * @jingjiejiang Jun 21, 2019
 * // further test [1,2,3,4,3]
 * // https://leetcode.com/problems/next-greater-element-ii/discuss/98273/Java-10-lines-and-C%2B%2B-12-lines-linear-time-complexity-O(n)-with-explanation
 */
var nextGreaterElements = function (nums) {

    let stack = [];
    let res = [];
    nums = nums.concat(nums)

    nums.forEach((num, idx) => {
    
        res[idx] = -1;

        while (stack.length > 0 && num > nums[stack[stack.length - 1]]) {
            res[stack[stack.length - 1]] = num;
            stack.pop();
        }
        stack.push(idx);
    });

    return res.slice(0, Math.floor(res.length / 2));
};