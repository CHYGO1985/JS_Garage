/**
 * Initialize your data structure here.
 */
var RandomizedSet = function() {
    
    this.nums = [];
    this.numLocMap = {};
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    const { nums, numLocMap } = this;  

    if (numLocMap[val]) return false;

    nums.push(val);
    numLocMap[val] = nums.length - 1;

    return true;
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {

    const { nums, numLocMap } = this;
    
    // if map has val, find it in array, swap it with last num, change last num pos in map
    if (!numLocMap[val]) return false;

    let valLoc = numLocMap[val];

    let tmp = nums[nums.length - 1];
    nums[nums.length - 1] = nums[valLoc];
    nums[valLoc] = tmp;

    // if the num to delete is not the last one, update the swapped num loc
    if (valLoc !== nums.length - 1) {
        numLocMap[tmp] = valLoc;
    }

    delete numLocMap[val];
    nums.pop();
    return true;
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    const { nums } = this;
    
    return nums[Math.floor(Math.random() * Math.floor(nums.length))];
};

/** 
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */