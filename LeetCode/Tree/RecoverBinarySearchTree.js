/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 * 
 * @jingjiejiang Aug 26, 2019
 * ref: https://www.cnblogs.com/springfor/p/3891390.html
 */
var recoverTree = function(root) {
    
    let pre, first, second;

    const findNodes = node => {

        if (!node) return ;

        findNodes(node.left);
        if (!pre) {
            pre = root;
        } else {
            if (pre.val > node.val) {
                if (!first) first = pre;
                second = node;
            }
            pre = root;
        }
        findNodes(node.right);
    }

    findNodes(root);
    if (first && second) {
        let tmpVal = first.val;
        first.val = second.val;
        second.val = tmpVal;
    }
};