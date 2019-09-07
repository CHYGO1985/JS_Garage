/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * 
 * @jingjiejiang Sep 7, 2019
 */
var search = function(nums, target) {
    
  if (nums == null || nums.length == 0) return -1;

  let head = 0, rear = nums.length - 1;

  while (head <= rear) {
    
    const mid = head + Math.floor((rear - head) / 2);

    if (nums[mid] === target) return mid;

    if (nums[mid] < nums[rear]) {
      if (target > nums[mid] && target <= nums[rear]) head = mid + 1;
      else rear = mid - 1;
    } else {
      if (target < nums[head] || target > nums[mid]) head = mid + 1;
      else rear = mid - 1;
    }
  }

  return -1;
};