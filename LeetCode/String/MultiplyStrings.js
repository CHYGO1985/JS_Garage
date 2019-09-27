/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 * 
 * @jingjiejiang Sep 27, 2019
 */
var multiply = function(num1, num2) {
    
  if (num1 == null || num1.length === 0 ||
    num2 == null || num2.length === 0) return null;
    // [...Array(n)].map(ele => Array(n));

  const nums = [...Array(num1.length + num2.length)].map(_ => 0);
  let res = '';
  
  for (let idx1 = num1.length - 1; idx1 >= 0; idx1 --) {
    for (let idx2 = num2.length - 1; idx2 >= 0; idx2 --) {
      let tmpRes = (num1.charCodeAt(idx1) - 48) * (num2.charCodeAt(idx2) - 48);
      const newPosLeft = idx1 + idx2, newPosRight = newPosLeft + 1;
      
      tmpRes += nums[newPosRight]; // plus previous carry number
      nums[newPosLeft] += Math.floor(tmpRes / 10);
      nums[newPosRight] = tmpRes % 10; 
    }
  }
    
  for (let num of nums) {
    if (res.length > 0 || num != 0) res += num;
  }

  return res.length === 0? '0' : res; // did not consider multiply 0
};