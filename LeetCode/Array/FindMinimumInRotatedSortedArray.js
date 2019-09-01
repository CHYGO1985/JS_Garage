/**
 * @param {number[]} nums
 * @return {number}
 * 
 * @jingjiejiang Sep 1, 2019
 */
var findMin = function(nums) {

  if (nums === null || nums.length === 0) return null;

  let start = 0, end = nums.length - 1;

  while (start < end) {
    const mid = start + Math.floor((end - start) / 2);

    // if rotated, then nums[start] > nums[end]
    if (nums[start] > nums[end]) {
      if (nums[mid] > nums[end]) start = mid + 1;
      else end = mid 
    } else {
      break;
    }
  }

  return nums[start];
}; 