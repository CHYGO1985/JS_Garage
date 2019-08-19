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
        
        if (!node.left && !node.right) {
            node = node.left;
            return ;
        } else if (node.right && node.left) {

            let shift = node.right;
            while (shift.left) {
                shift = shift.left;
            }
            shift.left = node.left;
            
            node.val = node.right.val;
            node.left = node.right.left;
            node.right = node.right.right;
            
            return ;
        }

        if (node.left) {
            node.val = node.left.val;
            // must put right first, otherwise node.left will become null
            node.right = node.left.right;
            node.left = node.left.left;
        }
        else {
            node.val = node.right.val;
            node.left = node.right.left;
            node.right = node.right.right;
        }
        
        return ;
    };

    const traverser = node => {

        if (!node) return ;

        if (node.val === key) {
            deleter(node);
            // node = null;
        }

        if (node.val > key) {
            traverser(node.left);
        } else {
            traverser(node.right);
        }      
    };

    if (!root) return root;

    const shift = root;
    traverser(shift);
    
    return root;
};
