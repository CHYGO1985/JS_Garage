/**
 * @param {number[]} arr
 * @return {number}
 * 
 * @jingjiejiang Sep 17, 2019
 */
var maxChunksToSorted = function(arr) {
    
    if (arr == null || arr.length === 0) return 1;

    const numStack = [];
    
    for (let idx = 0; idx < arr.length; idx ++) {
        if (idx === 0 || arr[idx] >= numStack[numStack.length - 1]) {
            numStack.push(arr[idx]);
            continue;
        }
        
        let curMax = numStack[numStack.length - 1];
        numStack.pop(curMax);
        while (numStack.length >= 0 && arr[idx] < numStack[numStack.length - 1]) {
            numStack.pop();
        }
        numStack.push(curMax);
    }

    return numStack.length;
};