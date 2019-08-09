/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 * 
 * @jingjiejiang Aug 9, 2019
 */
var serialize = function(root) {
    
    const preOrderTrav = root => {
        if (!root) {
            return "#";
        }

        return [root.val].concat(preOrderTrav(root.left), preOrderTrav(root.right));
    };

    return JSON.stringify(preOrderTrav(root));
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    
    let idx = 0;

    const construct = arr => {

        if (arr[idx] === "#") {
            idx ++;
            return null;
        }

        const root = new TreeNode(arr[idx ++]);
        root.left = construct(arr);
        root.right = construct(arr);

        return root;
    }

    return construct(JSON.parse(data));
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */