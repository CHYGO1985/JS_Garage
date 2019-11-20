import java.util.PriorityQueue;

/**
 * @jingjiejiang Nov 20, 2019
 */
class MedianFinder {

  private PriorityQueue<Integer> small;
  private PriorityQueue<Integer> big;

  /** initialize your data structure here. */
  public MedianFinder() {
    small = new PriorityQueue<>();
    big = new PriorityQueue<>((a, b) -> b - a);  
  }
  
  public void addNum(int num) {
    small.offer(num);
    big.offer(small.poll());
    if (small.size() < big.size()) {
      small.offer(big.poll());
    }    
  }
  
  public double findMedian() {
      // ** only peeek, not poll
      return small.size() > big.size() ?
      small.peek() : (small.peek() + big.peek()) / 2.0; 
  }
}

/**
* Your MedianFinder object will be instantiated and called as such:
* MedianFinder obj = new MedianFinder();
* obj.addNum(num);
* double param_2 = obj.findMedian();
*/