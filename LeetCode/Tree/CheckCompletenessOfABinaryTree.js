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
 * 
 * @jingjiejiang Aug 29, 2019
 */
var isCompleteTree = function(root) {
    // is left not  leave & right is null
    // left is null & right : false (this include left is null and right is a non leaf node)
    let queue = [];

    queue.push(root);

    while (queue.length > 0) {
      const curNode = queue.shift()
      // if pre is null and next is node, then return false
      if (!curNode && queue[0]) return false;
      
      if (curNode) {
        queue.push(curNode.left);
        queue.push(curNode.right);
      }
    }

    return true;
};
