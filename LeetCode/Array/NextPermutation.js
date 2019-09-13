/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 * 
 * @jingjijiang Sep 13, 2019
 */
var nextPermutation = function(nums) {
    
  if (nums == null || nums.length === 0) return nums;

  const swap = (nums, leftIdx, rightIdx) => {
    const tmp = nums[leftIdx];
    nums[leftIdx] = nums[rightIdx];
    nums[rightIdx] = tmp;
  };

  const reverse = (nums, head, rear) => {
    while (head < rear) {
      swap(nums, head ++ , rear --);
    }
  };

  // find first [i] < [i + 1]
  let firstDscIdx = nums.length - 2;
  for (; firstDscIdx >= 0; firstDscIdx --) {
    if (nums[firstDscIdx + 1] > nums[firstDscIdx]) {

      let nextBigNum = nums.length - 1;
      for (; nextBigNum > firstDscIdx; nextBigNum --) {
        if (nums[nextBigNum] > nums[firstDscIdx]) break;
      }

      swap(nums, firstDscIdx, nextBigNum);
      reverse(nums, firstDscIdx + 1, nums.length - 1);
      return nums;
    }
  }
  // if descend for all array
  reverse(nums, 0, nums.length - 1);
  return nums;
};