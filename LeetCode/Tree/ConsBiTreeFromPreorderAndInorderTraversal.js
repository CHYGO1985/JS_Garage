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
  
  const builder = (rootIdx, startIdx, len) => {
    if (!preorder) return root;
    if (rootIdx >= preorder.length) return ;

    root = new TreeNode(preorder[rootIdx]);
    
    let shift = inorder.indexOf(preorder[rootIdx]);
    let delimiter = shift - startIdx + 1;
    builder(rootIdx + 1, startIdx, shift - 1);
    builder(startIdx + delimiter, shift + 1, len - shift - 1);
  }

  builder(root, rootIdx, startIdx);
  
  return root;
};