/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 * 
 * @jingjiejiang Aug 18, 2019
 */
var deleteNode = function(root, key) {

    if (!root) {
        return null;
    }

    if (root.val === key) {
        if (!root.right) return root.left;
        else if (!root.left) return root.right;
        else {
            let shift = root.right;
            while (shift.left) {
                shift = shift.left;
            }
            shift.left = root.left;
            
            root.val = root.right.val;
            root.left = root.right.left;
            root.right = root.right.right;
        }

        return root;
    }
    
    if (root.val > key) root.left = deleteNode(root.left, key);
    else root.right = deleteNode(root.right, key);

    return root;
};
