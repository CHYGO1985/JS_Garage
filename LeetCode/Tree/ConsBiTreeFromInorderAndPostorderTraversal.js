/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 * 
 * @jingjiejiang Aug 18, 2019
 */
var buildTree = function(inorder, postorder) {
    
    // postOrder: start from length-1
    const builder = (inStart, inLimit, postStart, postLimit) => {

        if (inStart > inLimit || postStart > postLimit) return null;

        const rootVal = postorder[postLimit];
        const rootInInorder = inorder.indexOf(rootVal);
        const leftNdoesCnt = rootInInorder - inStart;

        const root = new TreeNode(rootVal);
        root.left = builder(inStart, rootInInorder - 1, postStart, start + leftNdoesCnt - 1);
        root.right = builder(rootInInorder + 1, inLimit, postStart + leftNdoesCnt, postLimit - 1);

        return root;
    };

    return builder(0, inorder.length - 1, 0, postorder.length - 1);

};