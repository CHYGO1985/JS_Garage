/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 * 
 * @jingjiejiang Jun 12, 2019
 */
var combinationSum = function(candidates, target) {
    
    let res = [];
    let tmpRes = [];

    const getCombination = (candidates, target, tmpRes, start) => {

        if (target < 0) return;
        if (target === 0) res.push(tmpRes.slice());

        for (let idx = start; idx < candidates.length; idx ++) {
            if (target < 0) break;
            tmpRes.push(candidates[idx]);
            getCombination(candidates, target - candidates[idx], tmpRes, idx);
            tmpRes.pop();
        }
    }

    getCombination(candidates, target, tmpRes, 0);

    return res;
};