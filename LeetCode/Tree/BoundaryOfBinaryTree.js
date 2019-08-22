/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 * 
 * @jingjiejiang Aug 22, 2019
 */
var boundaryOfBinaryTree = function(root) {

    const leftBound = [], leavesBound = [], rightBound = [];
    let isFirstLeave = true;

    const getLeftBound = node => {

        if (!node) return;
                
        if (isFirstLeave && (node.left || node.right)) leftBound.push(node.val);
        if (!node.left && !node.right && isFirstLeave) {
            isFirstLeave = false;
        }

        getLeftBound(node.left);
        getLeftBound(node.right);
    };

    const getLeavesBound = node => {

        if (!node) return;

        if (!node.left && !node.right) leavesBound.push(node.val);
        getLeavesBound(node.left);
        getLeavesBound(node.right);
    };
    
    const getRightBound = node => {

        if (!node) return;

        if (isFirstLeave && (node.left || node.right)) rightBound.unshift(node.val);
        if (!node.left && !node.right && isFirstLeave) {
            isFirstLeave = false;
        }

        getRightBound(node.right);
        getRightBound(node.left);
    }

    if(!root) return [];
    
    leftBound.push(root.val);
    
    getLeftBound(root.left);
    getLeavesBound(root.left);
    getLeavesBound(root.right);
    isFirstLeave = true;
    getRightBound(root.right);
    
    return leftBound.concat(leavesBound).concat(rightBound);
};