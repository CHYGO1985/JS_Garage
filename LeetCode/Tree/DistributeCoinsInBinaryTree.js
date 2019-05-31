/**
 * @param {TreeNode} root
 * @return {number}
 * 
 * @jingjiejiang May 31, 2019
 */
var distributeCoins = function(root) {
    
    if (root === null) return 0;
    
    let steps = [0];
    calcSteps(root, steps);
    
    return steps[0];
};

var calcSteps = function(root, steps) {
    
    if (root === null) return 0;
    
    let rootVal = root.val - 1;
    
    const left = calcSteps(root.left, steps);
    const right = calcSteps(root.right, steps);
    
    rootVal += left + right;
    
    steps[0] += left >= 0 ? left : - left;
    steps[0] += right >= 0 ? right : - right;
    
    return rootVal;
}
