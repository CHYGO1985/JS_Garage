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
 * @jingjiejiang Aug 15, 2019
 */
var buildTree = function(preorder, inorder) {
    
  let rootIdx = 0, startIdx = 0, root = null;
  
  const builder = (root, rootIdx, startIdx) => {
    if (!preorder) return root;

    root = new TreeNode(preorder[rootIdx]);
    
    let shift = inorder.indexOf(preorder[rootIdx]);
    let delimiter = startIdx + shift + 1;
    builder(root.left, rootIdx + 1, startIdx);
    builder(root.right, delimiter, startIdx);
  }

  builder(root, rootIdx, startIdx);
  
  return root;
};