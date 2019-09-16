/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 * 
 * @jingjiejiang Sep 16, 2019
 */
var checkSubarraySum = function(nums, k) {
    
  if (nums == null || nums.length === 0) return false;

  let sum = 0;
  const numMap = {};
  numMap[0] = -1;

  for (let idx = 0; idx < nums.length; idx ++) {

    sum += nums[idx];
    let remain = (k === 0)? sum : (sum % k);
    if (numMap[remain] != null) {
      // numMap[remain] may return idx as 0, which is also false, will force update the value
      if (idx - numMap[remain] > 1) return true;
    } else {
      numMap[remain] = idx;
    }
  }

  return false;
};