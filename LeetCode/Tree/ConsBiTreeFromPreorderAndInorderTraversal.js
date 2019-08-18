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
  
<<<<<<< HEAD
  const builder = (rootIdx, startIdx, len) => {
    if (!preorder) return root;
    if (rootIdx >= preorder.length) return ;

    root = new TreeNode(preorder[rootIdx]);
    
    let shift = inorder.indexOf(preorder[rootIdx]);
    let delimiter = shift - startIdx + 1;
    builder(rootIdx + 1, startIdx, shift - 1);
    builder(startIdx + delimiter, shift + 1, len - shift - 1);
=======
  const builder = (preStart, preLen, inStart, inLen) => {
    if (preStart > preLen || inStart > inLen) return null;

    let rootPosInorder = inorder.indexOf(preorder[preStart]);
    let leftNodesCnt = rootPosInorder - inStart;
    let root = new TreeNode(preorder[preStart]);

    root.left = builder(preStart + 1, preStart + leftNodesCnt, inStart, rootPosInorder - 1);
    root.right = builder(preStart + leftNodesCnt + 1, preLen, rootPosInorder + 1, inLen);

    return root;
>>>>>>> 959dac5bd57fa1438c235feabe5c1f339c0b3c56
  }

  return builder(0, preorder.length - 1, 0, inorder.length - 1);  
};
