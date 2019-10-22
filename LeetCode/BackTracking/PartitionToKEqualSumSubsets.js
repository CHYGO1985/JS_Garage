/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 * 
 * @jingjiejiang Oct 14, 2019
 */
var canPartitionKSubsets = function(nums, k) {
    
  if (nums == null || nums.length === 0) return false;

  let sum = 0;
  for (let num of nums) sum += num;
  if (sum % k !== 0) return false;

  let subSum = Math.floor(sum / k);
  Arrays.sort((a, b) => a - b);
  let rearIdx = nums.length - 1;
  if (nums[rearIdx] > subSum) return false

  while (rearIdx >= 0 && nums[rearIdx] === subSum) {
    rearIdx --;
    k --;
  }

  const getPartition = (subSets, index, target) => {
    if (index < 0) return true;

    let selected = nums[index];
    for (let idx = 0; idx < subSets.length; idx ++) {
      if (subSets[idx] + selected <= target) {
        subSets[idx] += selected;
        if (getPartition(subSets, index - 1, target)) {
          return true;
        }
        subSets[idx] -= selected;
      }
    }

    return false;
  }
    
  return getPartition([...Array(k).fill(0)], rearIdx, subSum);
};