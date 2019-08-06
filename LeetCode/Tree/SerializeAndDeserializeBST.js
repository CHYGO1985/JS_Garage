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
 * @jingjiejiang Aug 6, 2019
 */

// https://leetcode.com/problems/serialize-and-deserialize-bst/discuss/93170/pre-or-post-
// order-with-only-keeping-one-bound(beat-98-and-95)

//ref: https://leetcode.com/problems/serialize-and-deserialize-bst/discuss/93199/Extremely-Elegant-and-Simple-JavaScript-solution
var serialize = function(root) {
    
    const traverse = node => {
        if (!node) return [];

        return [node.val].concat(traverse(node.left), traverse(node.right));
    }

    return JSON.stringify(traverse(root));
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    const construct = arr => {
        if (!arr.length) return null;

        const root = new TreeNode(arr[0]);
        root.left = construct(arr.filter(num => num < root.val));
        root.right = construct(arr.filter(num => num > root.val));

        return root;
    };

    return construct(JSON.parse(data));
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */