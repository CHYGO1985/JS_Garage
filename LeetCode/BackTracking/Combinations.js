/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 * 
 * @jingjiejiang Jul 29, 2019
 */
var combine = function(n, k) {
  
  const res = [];
  const curComb = [];

  const getComb = (start, curComb, k) => {

    if (curComb.length === k) {
      res.push(curComb.slice());
      return ;
    } 

    for (let num = start; num <= n; num ++) {
      curComb.push(num);
      getComb(num + 1, curComb, k);
      curComb.pop(num)
    }
  };

  getComb(1, curComb, k);

  return res;
};