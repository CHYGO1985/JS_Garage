/**
 * @param {number[]} height
 * @return {number}
 * 
 * @jingjiejiang Aug 30, 2019
 */
var maxArea = function(height) {
    
    let head = 0, rear = height.length - 1, max = Number.MIN_SAFE_INTEGER;

    while (head < rear) {

        max = Math.max(max, Math.min(height[head], height[rear]) * (rear - head));

        if (height[head] < height[rear]) {
            head ++;
        } else {
            rear --;
        }
    }

    return max;
};