/**
 * // Definition for a Node.
 * function Node(val,left,right,next) {
 *    this.val = val;
 *    this.left = left;
 *    this.right = right;
 *    this.next = next;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 * 
 * @jingjiejiang Aug 20, 2019
 */
var connect = function(root) {
    
    const res = [];

    const traverse = (node, level) => {
        if (!node) return ;

        if (!res[level]) {
            res[level] = node;
        } else {
            res[level].next = node;
            res[level] = node;
        }

        traverse(node.left, level + 1);
        traverse(node.right, level + 1);
    }

    traverse(root, 0);
    return res;
};