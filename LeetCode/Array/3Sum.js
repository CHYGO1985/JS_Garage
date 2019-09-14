/**
 * @param {number[]} nums
 * @return {number[][]}
 * 
 * @jingjiejiang Sep 14, 2019
 */
var threeSum = function(nums) {
    
  let res = [];
  if (nums == null || nums.length === 0) return res;

  const findMatch = (nums, start, end, target) => {

    while (start < end) {

      if (nums[start] + nums[end] === target) {
        res.push(new Array(-target, nums[start], nums[end]));
        // get rid of repeated nums
        while (start < end && nums[start] === nums[start + 1]) start ++;
        while (start < end && nums[end] === nums[end - 1]) end --;
        start ++;
        end --;
      } else if (nums[start] + nums[end] < target) {
        start ++;
      } else {
        end --;
      }
    }
  }

  nums.sort((a, b) => {return a - b;});

  for (let idx = 0; idx < nums.length; idx ++) {
    if (nums[idx] > 0) continue;
    if (idx > 0 && nums[idx] === nums[idx - 1]) continue;
    
    findMatch(nums, idx + 1, nums.length - 1, - nums[idx]);
  }

  return res;
};