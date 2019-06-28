/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
        
    const swap = (nums, idx1, idx2) => {
        const tmp = nums[idx2];
        nums[idx2] = nums[idx1];
        nums[idx1] = tmp;
    }

    for (let idx = 0; idx < nums.length; idx ++) {

        if (nums[nums[idx] - 1] === nums[idx]) return idx;
        swap(nums, nums[idx] - 1, idx);
    }

    return 0;
};