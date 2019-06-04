/**
 * @param {number[][]} points
 * @param {number} K
 * @return {number[][]}
 * 
 * @jingjiejiang Jun 4, 2019
 */
var kClosest = function (points, K) {
    if (points === null || points.length <= K) return points;

    const getDistance = (point) => {
        return Math.pow(point[0], 2) + Math.pow(point[1], 2);
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

        let pivot = points[start];
        let shiftHead = start, shiftEnd = end;

        while (shiftHead < shiftEnd) {
            while (isLeftSmallThenRight(points[shiftHead], pivot)) shiftHead++;
            while (isLeftSmallThenRight(pivot, points[shiftEnd])) shiftEnd--;

            if (shiftHead <= shiftEnd) {
                swapPoints(points, shiftHead, shiftEnd);
                shiftHead++;
                shiftEnd--;
            }
        }

        if (shiftEnd > start) sort(points, start, shiftEnd);
        if (shiftHead < end) sort(points, shiftHead, end);

        return points;
    };

    return sort(points, 0, points.length - 1).slice(0, K);
};