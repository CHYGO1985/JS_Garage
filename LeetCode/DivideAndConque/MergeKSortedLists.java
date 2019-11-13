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

    return partition(lists, 0, lists.length - 1);  
  }

  private ListNode partition(ListNode[] lists, int left, int right) {
    if (left == right) return lists[left];

    int mid = left + (right - left) / 2;
    ListNode leftPart = partition(lists, left, mid);
    ListNode rightPart = partition(lists, mid + 1, right);

    return merge(leftPart, rightPart);
  }

  // private ListNode merge(ListNode left, ListNode right) {

  //   ListNode shift = new ListNode(0);
  //   ListNode dummyHead = shift;

  //   while (left != null && right != null) {
  //     if (left.val <= right.val) {
  //       shift.next = left;
  //       left = left.next;
  //     } else {
  //       shift.next = right;
  //       right = right.next;
  //     }

  //     shift = shift.next;
  //   }

  //   while (left != null) {
  //     shift.next = left;
  //     left = left.next;
  //     shift = shift.next;
  //   }

  //   while (right != null) {
  //     shift.next = right;
  //     right = right.next;
  //     shift = shift.next;
  //   }

  //   return dummyHead.next;
  // }

  // recursive
  private ListNode merge(ListNode left, ListNode right) {
    if (left == null) return right;
    if (right == null) return left;

    if (left.val <= right.val) {
      left.next = merge(left.next, right);
      return left;
    } else {
      right.next = merge(left, right.next);
      return right;
    }
  }
}