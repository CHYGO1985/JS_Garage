/**
 * @param {number[][]} intervals
 * @return {number[][]}
 * 
 * @jingjiejiang Sep 11, 2019
 */
var merge = function(intervals) {
    
    if (intervals == null || intervals.length === 0)
        return intervals;

    intervals.sort((a, b) => {
        return a[0] === b[0]? a[1] - b[1] : a[0] - b[0];
    });

    let res = [], tmp = [];

    intervals.forEach((interval, index) => {
        if (tmp.length === 0) {
            interval.forEach(ele => tmp.push(ele));
        } else {
            if (interval[0] <= tmp[1]) {
                tmp[1] = Math.max(interval[1], tmp[1]);
            } else { // interval[0] > tmp[1]
                res.push(tmp.slice());
                tmp = interval;
            }
        }
        if (index === intervals.length - 1) res.push(tmp);
    });

    return res;
};