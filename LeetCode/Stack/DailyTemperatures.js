/**
 * @param {number[]} T
 * @return {number[]}
 * 
 * @jingjiejiang Jun 5, 2019
 */
var dailyTemperatures = function (T) {

    let res = [];
    let resLen = T.length;
    let stack = [];

    for (let idx = 0; idx < T.length; idx++) {
        while (stack.length > 0 && T[stack[stack[length - 1]]] < T[idx]) {
            let preIdx = stack.pop();
            res[preIdx] = idx - preIdx;
        }

        stack.push(idx);
    }

    return res;
};