/**
 * Definition for singly-linked list.
 */ 
function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 * 
 * @jingjiejiang Jun 25, 2019
 */
var addTwoNumbers = function (l1, l2) {

    if (l1 === null) return l2;
    if (l2 === null) return l1;

    let carrier = 0;
    let stack1 = [];
    let stack2 = [];
    let res = null;

    while (l1 != null) {
        stack1.push(l1.val);
        l1 = l1.next;
    }

    while (l2 != null) {
        stack2.push(l2.val);
        l2 = l2.next;
    }


    while (stack1.length > 0 || stack2.length > 0 || carrier > 0) {

        const num1 = stack1.length > 0 ? stack1.pop() : 0;
        const num2 = stack2.length > 0 ? stack2.pop() : 0;

        const sum = num1 + num2 + carrier;

        let curNode = new ListNode();
        curNode.val = Math.floor(sum % 10);
        curNode.next = res;
        res = curNode;

        carrier = Math.floor(sum / 10);
    }

    return res;
};