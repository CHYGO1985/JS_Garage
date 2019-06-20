/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 * 
 * @jingjiejiang Jun 20, 0219
 */
var kthSmallest = function (root, k) {

    if (root === undefined || root === null) return undefined;
    let count = [];
    count[0] = k;
    let res = undefined;

    const getKth = (root, count) => {

        if (root === null) return;

        getKth(root.left, count);
        count[0] -= 1;
        if (count[0] === 0) {
            res = root.val
            return;
        }
        getKth(root.right, count);
    };

    getKth(root, count);

    return res;
};
