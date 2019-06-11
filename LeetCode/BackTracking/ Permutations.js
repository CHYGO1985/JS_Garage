/**
 * @param {number[]} nums
 * @return {number[][]}
 * 
 * @jingjiejiang Jun 11, 2019
 */
var permute = function(nums) {
    
    let res = [];
    let curRes = [];
        
    const getPermute = (nums, curRes) => {

        if (curRes.length === nums.length) {
            res.push(curRes.concat());
            return ;
        }

        for (let idx = 0; idx < nums.length; idx ++) {
            
            if (curRes.includes(nums[idx])) continue;
            
            curRes.push(nums[idx]);   
            getPermute(nums, curRes);
            curRes.pop();   
        }
        
    };

    getPermute(nums, curRes);
    return res;
};
