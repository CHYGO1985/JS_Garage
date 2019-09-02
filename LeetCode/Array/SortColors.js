/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 * 
 * @jingjiejiang Sep 2, 2019
 */
var sortColors = function(nums) {
    
    let zeroIdx = 0, twoIdx = nums.length - 1;

    const swap = (nums, pos1, pos2) => {

        const tmp = nums[pos1];
        nums[pos1] = nums[pos2];
        nums[pos2] = tmp;
    };
    
    for (let idx = 0; idx <= twoIdx; idx ++) {
        
        if (nums[idx] === 0) {
            swap(nums, idx, zeroIdx ++);
        } else if (nums[idx] === 2) {
            swap(nums, idx --, twoIdx --);
        }
    }

    return nums;
};