/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 * 
 * @jingjiejiang Aug 16, 2019
 * ref: https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/discuss/34553/Simple-JavaScript-solution
 */
var buildTree = function(preorder, inorder) {
  
  const builder = (preStart, preLen, inStart, inLen) => {
    if (preStart > preLen || inStart > inLen) return null;

    let rootPosInorder = inorder.indexOf(preorder[preStart]);
    let leftNodesCnt = rootPosInorder - inStart;
    let root = new TreeNode(preorder[preStart]);

    root.left = builder(preStart + 1, preStart + leftNodesCnt, inStart, rootPosInorder - 1);
    root.right = builder(preStart + leftNodesCnt + 1, preLen, rootPosInorder + 1, inLen);

    return root;
  }

  return builder(0, preorder.length - 1, 0, inorder.length - 1);  
};
