/**
 * @param {number} n
 * @param {string[]} logs
 * @return {number[]}
 * 
 * @jingjiejiang Jul 3, 2019
 */
var exclusiveTime = function(n, logs) {
  let res = [...Array(n)].fill(0), stack = [];
  for (let idx = 0; idx < logs.length; idx ++) {
    let log = logs[idx].split(':');
    if (log[1] == 'start') {
      stack.push([log[2], 0]);
    } else {
      const start = stack.pop();
      const time = log[2] - start[0] + 1;
      res[log[0]] += time - start[1];
      if (stack.length > 0) {
        stack[stack.length - 1][1] += time;
      }
    }
  }
  return res;
};