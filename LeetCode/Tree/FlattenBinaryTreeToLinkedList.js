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
 * @jingjiejiang Aug 13, 2019
 */
var flatten = function(root) {
    let prev = null;

    const flat = node => {

        if (!node) return ;

        flat(node.right);
        flat(node.left);

        node.right = prev;
        node.left = null;
        
    };
};