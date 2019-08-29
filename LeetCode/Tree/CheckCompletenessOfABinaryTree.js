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
    // left is null & right : false

    let res = true;

    const checkComplete = node => {
        if (!node) return true;

        const isLeftLeave = checkComplete(node.left);
        const isRightLeave = checkComplete(node.right);
        
        if ((!node.left && node.right) && (isLeftLeave === false && !node.right)) {
            res &= false;
        }

        return (!node.left && !node.right) ? true : false;
    }
};