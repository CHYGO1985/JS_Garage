/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    
  const checkBST = node => {
    if (!node) return [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, true];

    const leftRes = checkBST(node.left);
    const rightRes = checkBST(node.right);

    if (node.val > leftRes[1] && node.val < rightRes[0]) {
      return [Math.min(leftRes[0], node.val),
              Math.max(rightRes[1], node.val),
              leftRes[2] & rightRes[2]];
    } else {
      return [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, false];
    }
  }

  return checkBST(root)[2];
};