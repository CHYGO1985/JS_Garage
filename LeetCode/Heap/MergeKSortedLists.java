import java.util.PriorityQueue;

// Definition for singly-linked list.
/**
 * @jingjiejiang Nov 12, 2019
 */
public class ListNode {    
    int val;    
    ListNode next;
    ListNode(int x) { val = x; }
}

class MergeKSortedLists {
    public ListNode mergeKLists(ListNode[] lists) {
        
        if (lists == null || lists.length == 0) return null;

        PriorityQueue<ListNode> queue = new PriorityQueue<>(lists.length, (node1, node2) -> node1.val - node2.val); 

        for (ListNode list : lists) {
            // special test cases
            if (list != null) queue.add(list);
        }

        ListNode shiftNode = new ListNode(0);
        ListNode dummyHead = shiftNode;

        while (queue.isEmpty() == false) {
            shiftNode.next = queue.poll();
            shiftNode = shiftNode.next;

            if (shiftNode.next != null) {
                queue.add(shiftNode.next);
            }
        }

        return dummyHead;
    }
}