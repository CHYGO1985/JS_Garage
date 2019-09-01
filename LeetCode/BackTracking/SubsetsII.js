/**
 * @param {number[]} nums
 * @return {number[][]}
 * 
 * @jingjiejiang Sep 1, 2019
 */
var subsetsWithDup = function(nums) {
    
  const res = [];
  let prePopNum;

  const getSets = (start, tmpArr) => {
    res.push(tmpArr.slice());

    for (let idx = start; idx < nums.length; idx ++) {
      if (nums[idx] === prePopNum) continue;
      tmpArr.push(nums[idx]);
      getSets(idx + 1, tmpArr);
      prePopNum = tmpArr.pop(nums[idx]);
    }
  }

  if (nums === null || nums.length === 0) return res;

  nums.sort((a, b) => a - b);
  getSets(0, []);
  return res;
};