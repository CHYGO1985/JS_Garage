/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 * 
 * @jingjiejiang Jun 18, 2019
 * 
 * https://leetcode.com/problems/top-k-frequent-elements/discuss/149978/JavaScript-Clean-Bucket-Sort-Solution
 */
var topKFrequent = function(nums, k) {
    
    let map = new Map();
    let res = [];
    res.length = 4;
    let min = 0;

    const fillRes = (num) => {
        for (let idx = 0; idx < res.length; idx ++) {
            if (num > res[idx]) res[idx] = num;
            min = Math.min(res[idx], min);    
        }
    }

    nums.forEach((ele) => {

        const val = map.has(ele)? map.get(ele) + 1 : 1;
        map.put(ele, val); 

        if (val > min) fillRes(ele, val);
    });

    return res;
};