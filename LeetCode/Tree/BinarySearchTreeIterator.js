/**
 * Definition for a binary tree node.
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * @param {TreeNode} root
 * 
 * @jingjiejiang Jul 2, 2019
 */
var BSTIterator = function (root) {
    this.resStack = [];

    while (root) {
        this.resStack.push(root);
        root = root.left;
    }
};

/**
 * @return the next smallest number
 * @return {number}
 */
BSTIterator.prototype.next = function () {
    let res = 0;

    if (this.resStack.length > 0) {
        let curNode = this.resStack.pop();
        res = curNode.val;

        if (curNode.right) {
            curNode = curNode.right;
            this.resStack.push(curNode);
            while (curNode.left) {
                curNode = curNode.left
                this.resStack.push(curNode);
            }
        }
    }

    return res;
};

/**
 * @return whether we have a next smallest number
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
    return this.resStack.length > 0 ? true : false;
};

/** 
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */