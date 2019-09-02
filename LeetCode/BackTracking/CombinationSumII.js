/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 * 
 * @jingjiejiang Sep 2, 2019
 */
// var combinationSum2 = function (candidates, target) {

//     let res = [];
//     let tmpRes = [];
//     candidates.sort((a, b) => a - b);

//     const getCombination = (candidates, target, start) => {

//         if (target < 0) return;
//         if (target === 0) {
//             res.push(tmpRes.slice());
//             return;
//         }

//         for (let idx = start; idx < candidates.length; idx++) {
//             if (target < 0) break;
//             if (idx > start && candidates[idx] == candidates[idx - 1]) continue;
//             tmpRes.push(candidates[idx]);
//             getCombination(candidates, target - candidates[idx], idx + 1);
//             tmpRes.pop();
//         }
//     };

//     getCombination(candidates, target, 0);

//     return res;
// };

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    
    const res = [];
    candidates.sort((a,b) => a - b);

    const getCombination = (curSum, tmpRes, curIdx) => {
        if (curSum < 0) return ;
        if (curSum === 0) {
            res.push(tmpRes.slice());
            return ;
        }

        for (let idx = curIdx; idx < candidates.length; idx ++) {
            if (curSum < 0) break;
            // advoid duplicate, must be idx > curIdx not > 0
            if (idx > curIdx && candidates[idx] === candidates[idx - 1]) continue;
            tmpRes.push(candidates[idx]);
            getCombination(curSum - candidates[idx], tmpRes, idx + 1);
            tmpRes.pop();
        }
    };

    getCombination(target, [], 0);
    return res;
};