/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 * 
 * @jingjiejiang Jun 18, 2019
 * 
 * https://leetcode.com/problems/top-k-frequent-elements/discuss/149978/JavaScript-Clean-Bucket-Sort-Solution
 * https://leetcode.com/problems/minimum-area-rectangle/discuss/198983/JavaScript-Solution
 *
 */
var topKFrequent = function(nums, k) {
    
    const map = {};
    const result = [];
    const bucket = Array(nums.length + 1).fill().map(() => []);

    for (let num of nums) map[num] = ~~map[num] + 1;

    const keys = Object.keys(map);
    for (let key of keys) {
        bucket[map[parseInt(key)]].push(parseInt(key));
    }

    for (let count = nums.length; count >= 0 && k > 0; k--) {
        while (bucket[count].length === 0) count--;
        result.push(bucket[count].shift());
    }

    return result;
};