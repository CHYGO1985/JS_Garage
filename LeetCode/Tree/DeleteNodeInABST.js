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
    
    const deleter = node => {
        
        if (!node) return null;

        if (!node.left && !node.right) {
            return null;
        } else if (node.right && node.left) {

            let shift = node.right;
            while (shift.left) {
                shift = shift.left;
            }
            shift.left = node.left;
            node.left = null;
            
            return node.right;
        }

        if (root.left) 
            return node.left;
        else 
            return node.right;
    };

    const traverser = node => {

        if (!node) return ;

        if (node.val === key) {
            node = deleter(node);
        }

        if (node.val < key) {
            traverser(node.left);
        } else {
            traverser(node.right);
        }      
    };

    if (!root) return root;
    if (root.val === key) return deleter(root);

    const shift = root;
    traverser(shift);
    
    return root;
};
