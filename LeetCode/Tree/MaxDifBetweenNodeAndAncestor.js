//  Definition for a binary tree node.
 function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
 }

/**
 * @param {TreeNode} root
 * @return {number}
 * 
 * @jingjiejiang Jun 9, 2019
 */
var maxAncestorDiff = function(root) {
    
    if (root === null || root === undefined) return 0;
    // 0: max, 1: min, 2: maxval
    let interRes =[root.val, root.val, 0];

    const getMax = (root, interRes) => {

        if (root === null) return ;
        
        const tempMax = interRes[0];
        const tempMin = interRes[1];

        if (root.val > interRes[0]) interRes[0] = root.val;
        if (root.val < interRes[1]) interRes[1] = root.val;
        interRes[2] = Math.max(interRes[2], Math.abs(interRes[0] - interRes[1]));

        getMax(root.left, interRes);
        getMax(root.right, interRes);

        interRes[0] = tempMax;
        interRes[1] = tempMin;
    };

    getMax(root, interRes);

    return interRes[2];
};