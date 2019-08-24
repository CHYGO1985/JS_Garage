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
 * @jingjiejiang Aug 23, 2019
 * ref: https://www.cnblogs.com/grandyang/p/5188938.html
 */
var largestBSTSubtree = function(root) {

  const getBSTSubTreeCnt = node => {
    if (!node) return [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, 0];

    let leftBST = getBSTSubTreeCnt(node.left);
    let rightBST = getBSTSubTreeCnt(node.right);
    
    if ( (node.val > leftBST[1]) && (node.val < rightBST[0]) ) {
      // get rid of Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, from null node
      return [Math.min(leftBST[0], node.val),
              Math.max(rightBST[1], node.val),
              1 + leftBST[2] + rightBST[2]];
    } else {
      return [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Math.max(leftBST[2], rightBST[2])];
    }
  };

  const cnt = getBSTSubTreeCnt(root);

  return cnt[2];
};