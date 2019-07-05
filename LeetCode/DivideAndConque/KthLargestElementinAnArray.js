/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * 
 * @jingjiejiang Jul 5, 2019
 */
var findKthLargest = function(nums, k) {
  return quickSelect(nums, 0, nums.length - 1, k);
};

const swap = (arr, i, j) => {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

const quickSelect = (nums, lo, hi, k) => {
  // use quick sort's idea
  // put nums that are <= pivot to the left
  // put nums that are  > pivot to the right
  let i = lo, shift = lo;
  for (; shift < hi; shift ++) {
  
      if (nums[shift] < nums[hi]) {
        swap(nums, i++, shift);
      }
  }
  swap(nums, i, shift);

  // count the nums that are >= pivot
  const largeNums = hi - i + 1;
  // pivot is the one!
  if (largeNums === k) return nums[i];
  // pivot is too small, so it must be on the right
  if (largeNums > k) return quickSelect(nums, i + 1, hi, k);
  // pivot is too big, so it must be on the left
  return quickSelect(nums, lo, i - 1, k - largeNums);
};