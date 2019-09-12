/**
 * @param {number[]} nums
 * @return {number[]}
 * 
 * @jingjiejiang Sep 12, 2019
 */
var majorityElement = function(nums) {
    
    let res = [];
    if (nums == null || nums.length === 0) return res;

    let num1 = 0, cnt1 = 0, num2 = 0, cnt2 = 0;

    for (let num of nums) {
        if (num === num1) cnt1 ++;
        else if (num === num2) cnt2 ++;
        else if (cnt1 === 0) { num1 = num; cnt1 = 1; }
        else if (cnt2 === 0) { num2 = num; cnt2 = 1; }
        else { cnt1 --; cnt2 --; }
    }

    cnt1 = 0, cnt2 = 0;
    for (let num of nums) {
        if (num === num1) cnt1 ++;
        else if (num === num2) cnt2 ++;
    }

    if (cnt1 > Math.floor(nums.length / 3)) res.push(num1);
    if (cnt2 > Math.floor(nums.length / 3)) res.push(num2);

    return res;
};