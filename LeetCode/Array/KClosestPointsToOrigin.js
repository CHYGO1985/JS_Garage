/**
 * @param {number[][]} points
 * @param {number} K
 * @return {number[][]}
 * 
 * @jingjiejiang Jun 4, 2019
 */
var kClosest = function (points, K) {

    if (points === null || points.length <= k) return points;

    const getDistance = (point) => {
        return Math.pow(point[0] - 0, 2) + Math.pow(point[1] - 0, 2);
    };

    const swapPoints = (points, index1, index2) => {

        let point = points[index2];
        points[index2] = points[index1];
        points[index1] = point;
    };

    // false points1 < points2
    const isLeftSmallThenRight = (leftPoint, rightPoint) => {

        return getDistance(leftPoint) < getDistance(rightPoint) ? true : false;
    }

    const sort = (points, start, end) => {

        let pivot = points[0];
        let shiftHead = 0, shiftEnd = points.length - 1;

        while (shiftHead <= shiftEnd) {##ERR##
            while (isLeftSmallThenRight(shiftHead, pivot)) shiftHead++;
            while (isLeftSmallThenRight(pivot, shiftEnd)) shiftEnd--;

            if (shiftHead <= shiftEnd) {
                swapPoints(points, shiftHead ++, shiftEnd --);
            }
        }

        if (shiftHead < end) sort(points, shiftHead, end);
        if (shiftEnd > start) sort(points, start, shiftEnd);

        return points;
    };

    return sort(points, 0, points.length - 1).slice(0, K);
};