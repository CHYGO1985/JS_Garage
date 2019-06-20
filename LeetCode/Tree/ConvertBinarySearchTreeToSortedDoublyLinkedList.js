// Definition for a Node.
function Node(val,left,right) {
    this.val = val;
    this.left = left;
    this.right = right;
};
 
/**
 * @param {Node} root
 * @return {Node}
 * 
 * @jingjiejiang Jun 20, 2019
 */
var treeToDoublyList = function (root) {

    if (root === null) return null;

    let dummy = new Node(0, null, null);
    let shift = dummy;

    const helper = (root) => {

        if (root === null) return;

        helper(root.left);
        shift.right = root;
        root.left = shift;
        shift = root;
        helper(root.right);
    };

    helper(root);
    shift.right = dummy.right;
    dummy.right.left = shift;

    return dummy.right;
};