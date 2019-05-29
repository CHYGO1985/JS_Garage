/**
 * Initialize your data structure here.
 */
var MyLinkedList = function () {
    this.head = null;
    this.tail = null;
    this.length = 0;
};

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1. 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {

    if (index < 0 || index > this.length - 1) return -1;

    let shift = this.head;
    while (index > 0) {
        shift = shift.next;
        index--;
    }

    return shift.val;
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {

    let newNode = { val: val };
    newNode.next = this.head;
    let isFirst = (this.head === null) ? true : false;

    this.head = newNode;
    this.length++;

    if (isFirst) {
        this.tail = newNode;
        this.tail.next = null;
    }
};

/**
 * Append a node of value val to the last element of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {

    if (this.length === 0) {
        this.addAtHead(val);
        return;
    }

    let newNode = { val: val };
    newNode.next = null;
    this.tail.next = newNode;

    this.length++;
    this.tail = newNode;
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {

    if (index < 0 || index > this.length) return;

    if (index === 0) {
        this.addAtHead(val);
        return;
    }

    if (index === this.length) {
        this.addAtTail(val);
        return;
    }

    let newNode = { val: val };
    let shift = this.head;
    while (index > 1) {
        shift = shift.next;
        index--;
    }

    let curNext = shift.next;
    shift.next = newNode;
    newNode.next = curNext;

    this.length++;

};

/**
 * Delete the index-th node in the linked list, if the index is valid. 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {

    if (index < 0 || index >= this.length) return;

    if (index === 0) {
        let headNext = this.head.next;
        this.head.next = null;
        this.head = headNext;
        return;
    }

    let isTailChange = index === this.length ? true : false;

    let shift = this.head;
    while (index > 1) {
        shift = shift.next;
        index--;
    }

    shift.next = shift.next.next;
    if (isTailChange) tail = shift;
    this.length--;
};

/** 
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */