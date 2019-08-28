/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 * 
 * @jingjiejiang Aug 28, 2019
 */
var maxPathSum = function(root) {
    
  let maxSum = Number.MIN_SAFE_INTEGER;

  const getMaxSum = node => {

    if (!node) return 0;

    const leftSum = Math.max(0, getMaxSum(node.left));
    const rightSum = Math.max(0, getMaxSum(node.right));

    maxSum = Math.max(maxSum, leftSum + rightSum + node.val);
    return Math.max(leftSum, rightSum) + node.val;
  }; 

  getMaxSum(root);

  return maxSum;
};


