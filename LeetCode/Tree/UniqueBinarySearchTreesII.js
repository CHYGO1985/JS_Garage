/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 * 
 * @jingjiejiang Aug 21, 2019
 */
// devide and conquer
// + memorize ==> DP
var generateTrees = function(n) {

    if (n < 1) return [];
    const mapping = [...Array(n + 1)].map(ele => Array(n + 1));

    const buildTree = (low, high) => {
        const res = [];
        if (low > high) {
            res.push(null);
            return res;
        }

        if (dp[low][high]) return dp[low][high]

        for (let cnt = low; cnt <= high; cnt ++) {
            const leftSubTree = buildTree(low, cnt - 1);
            const rightSubTree = buildTree(cnt + 1, high);

            for (const left of leftSubTree) {
                for (const right of rightSubTree) {
                    const root = new TreeNode(cnt);
                    root.left = left;
                    root.right = right;
                    res.push(root);
                }
            }
        }

        dp[low][high] = res;

        return res;
    }

    return buildTree(1, n);
};