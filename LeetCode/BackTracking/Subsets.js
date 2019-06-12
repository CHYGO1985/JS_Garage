/**
 * @param {number[]} nums
 * @return {number[][]}
 * 
 * @jingjiejiang Jun 12, 2019
 */
var subsets = function (nums) {

    let res = [];
    let tempRes = [];
    let start = 0;

    const getSubSets = (nums, tempRes, start) => {

        res.push(tempRes.slice());

        for (let idx = start; idx < nums.length; idx++) {
            tempRes.push(nums[idx]);
            getSubSets(nums, tempRes, idx + 1);
            tempRes.pop();
        }
    };

    getSubSets(nums, tempRes, 0);

    return res;
};