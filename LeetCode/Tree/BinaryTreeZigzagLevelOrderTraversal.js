/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 * 
 * @jingjiejiang Aug 14, 2019
 */
var zigzagLevelOrder = function(root) {
    
  let res = [];

  const zigzagOrder = (node, level) => {
    
    if(!node) return ;

    if (!res[level]) res[level] = [];

    zigzagOrder(node.left, level + 1);
    zigzagOrder(node.right, level + 1);

    if (level % 2 === 0) {
      res[level].push(node.val);
    } else {
      res[level].unshift(node.val);
    }
  };

  zigzagLevelOrder(root, 0);
  return res;
};