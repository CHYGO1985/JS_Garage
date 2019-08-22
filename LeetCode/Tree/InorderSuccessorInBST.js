/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 * 
 * @jingjiejiang Aug 22, 2019
 */
var inorderSuccessor = function(root, p) {
    
    let res = null;

    const finder = node =>{

        if (!node) return null;

        if (p.val >= node.val) {
            finder(node.right);
        } else {
            res = node;
            finder(node.left);
        }
    };  

    finder(root);

    return res;
};