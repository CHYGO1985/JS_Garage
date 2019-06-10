// @jingjiejiang June 10, 2019
// Definition for a binary tree node.
 function TreeNode(val) {
     this.val = val;
     this.left = this.right = null;
 }

/**
 * @param {TreeNode} root
 * @return {number[]}
 * 
 * @jingjiejiang Jun 7, 2019
 */
var inorderTraversal = function (root) {

    let stack = [];
    let res = [];

    if (root === null) return [];

    const pushLeft = (root) => {
        while (root != null) {
            stack.push(root);
            root = root.left;
        }
        return root
    }

    while (root || stack.length > 0) {
        pushLeft(root);
        let curNode = stack.pop();
        res.push(curNode.val);
        root = curNode.right;
    }

    return res;
};