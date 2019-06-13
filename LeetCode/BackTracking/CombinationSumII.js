/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 * 
 * @jingjiejiang Jun 13, 2019
 */
var combinationSum2 = function (candidates, target) {

    let res = [];
    let tmpRes = [];
    candidates.sort((a, b) => a - b);

    const getCombination = (candidates, target, start) => {

        if (target < 0) return;
        if (target === 0) {
            res.push(tmpRes.slice());
            return;
        }

        for (let idx = start; idx < candidates.length; idx++) {
            if (target < 0) break;
            if (idx > start && candidates[idx] == candidates[idx - 1]) continue;
            tmpRes.push(candidates[idx]);
            getCombination(candidates, target - candidates[idx], idx + 1);
            tmpRes.pop();
        }
    };

    getCombination(candidates, target, 0);

    return res;
};