import java.util.Arrays;

/**
 * @jingjiejiang Nov 27, 2019 
 */
class Solution {
  public String largestNumber(int[] nums) {
      
    StringBuilder builder = new StringBuilder();
    if (nums == null || nums.length == 0) return builder.toString();

    String[] numsInStr = new String[nums.length];

    for (int idx = 0; idx < nums.length; idx ++) {
      numsInStr[idx] = String.valueOf(nums[idx]);
    } 

    Arrays.sort(numsInStr, (a, b) -> (b + a).compareTo(a + b));

    // ** for a bunch of "0"
    if (numsInStr[0].charAt(0) == '0') return "0";

    for (String num : numsInStr) {
      builder.append(num);
    }

    return builder.toString();
  }
}

