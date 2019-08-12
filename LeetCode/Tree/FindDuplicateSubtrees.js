/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode[]}
 * 
 * @jingjiejiang Aug 12, 2019
 */
var findDuplicateSubtrees = function(root) {
    
    let nodesMap = {}, res = [];

    const postOrderTraverse = node => {

        if (!node) return "#";

        let str = node.val + postOrderTraverse(node.left) + postOrderTraverse(node.right);
        if (!nodesMap[str]) {
            nodesMap[str] = 0;
        }
        nodesMap[str] ++;
        if (nodesMap[str] === 2) res.push(node);
        return str;
    };

    postOrderTraverse(root)
    return res;
};