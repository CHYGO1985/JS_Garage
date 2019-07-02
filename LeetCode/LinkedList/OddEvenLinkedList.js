 //Definition for singly-linked list.
 function ListNode(val) {
     this.val = val;
     this.next = null;
 }
 
/**
 * @param {ListNode} head
 * @return {ListNode}
 * 
 * @jingjiejiang Jul 1, 2019
 */
var oddEvenList = function (head) {

    let oddShift = head;
    if (oddShift === null) return oddShift;

    let evenShift = oddShift.next;
    let evenHead = oddShift.next;

    while (oddShift !== null && evenShift !== null && evenShift.next !== null) {

        if (evenShift.next !== null) {
            oddShift.next = evenShift.next;
            oddShift = oddShift.next;
        }

        // oddShift.next !== evenShift for 1 -> 2 -> null
        if (oddShift.next !== evenShift) {
            evenShift.next = oddShift.next;
            evenShift = evenShift.next;
        }
    }

    oddShift.next = evenHead;

    return head;
};