/**
 * Initialize your data structure here.
 * 
 * @jingjiejiang Jun 6, 2019
 */

let hitsList = [];
let sum = 0;

var HitCounter = function () {

    hitsList = [];
    sum = 0;
};

/**
 * Record a hit.
        @param timestamp - The current timestamp (in seconds granularity). 
 * @param {number} timestamp
 * @return {void}
 */
HitCounter.prototype.hit = function (timestamp) {

    hitsList.push([timestamp, 1]);
    sum += 1;
};

/**
 * Return the number of hits in the past 5 minutes.
        @param timestamp - The current timestamp (in seconds granularity). 
 * @param {number} timestamp
 * @return {number}
 */
HitCounter.prototype.getHits = function (timestamp) {

    while (hitsList.length > 0 && timestamp - hitsList[0][0] >= 300) {
        sum -= hitsList[0][1];
        hitsList.shift();
    }

    return sum;
};

/** 
 * Your HitCounter object will be instantiated and called as such:
 * var obj = new HitCounter()
 * obj.hit(timestamp)
 * var param_2 = obj.getHits(timestamp)
 */