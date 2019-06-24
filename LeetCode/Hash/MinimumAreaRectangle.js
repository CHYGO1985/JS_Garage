/**
 * @param {number[][]} points
 * @return {number}
 * 
 * @jingjiejiang Jun 24, 2019
 * ref: https://leetcode.com/problems/minimum-area-rectangle/discuss/192025/Java-N2-Hashmap
 */
var minAreaRect = function (points) {

    let pointsSet = {};
    let min = 0;
    let count = 0;

    points.forEach((point) => {
        if (pointsSet.hasOwnProperty(point[0])) {
            pointsSet[point[0]].add(point[1]);
        } else {
            pointsSet[point[0]] = new Set([point[1]]);
        }
    });

    points.forEach((point1) => {
        points.forEach((point2) => {
            if (point1[0] !== point2[0] && point1[1] !== point2[1]) {
                if (pointsSet[point1[0]].has(point2[1]) && pointsSet[point2[0]].has(point1[1])) {
                    const area = Math.abs((point1[0] - point2[0]) * (point1[1] - point2[1]));
                    min = count == 0 ? area : Math.min(min, area);
                    count++;
                }
            }
        });
    });

    return min;
};