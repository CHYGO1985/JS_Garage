/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * 
 * @jingjiejiang Sep 2, 2019
 */
var subarraySum = function(nums, k) {
    
    const map = new Map([[0, 1]]);
    let prefixSum = 0, res = 0;

    for (let num of nums) {
        prefixSum += num;
        res += (map.get(prefixSum - k) || 0);
        map.set(sum, (map.get(prefixSum) || 0) + 1);
    }

    return res;
};