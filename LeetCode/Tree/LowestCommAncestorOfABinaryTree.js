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
 * @param {TreeNode} q
 * @return {TreeNode}
 * 
 * @jingjiejiang Aug 21, 2019
 */
var lowestCommonAncestor = function(root, p, q) {

    let res = null;
    
    const findLCA = node => {

        if (!node) return false;

        let isLeftEqual = findLCA(node.left, p, q);
        let isRightEqual = findLCA(node.right, p, q);

        let isRootEqual = (node.val === p.val || node.val === q.val) ? true : false;
        
        if ( (isRootEqual && (isLeftEqual || isRightEqual)) || (isLeftEqual && isRightEqual)) {
            res = node;
        }
        
        return (isRootEqual || isLeftEqual || isRightEqual) ? true : false;
    };
    
    findLCA(root);
        
    return res;
};