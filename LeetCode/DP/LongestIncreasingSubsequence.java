import java.util.Arrays;

/**
 * @jingjiejiang Oct 23, 2019
 */
class Solution {
    public int lengthOfLIS(int[] nums) {
        
        if (nums == null || nums.length == 0) return 0;

        int[] lens = new int[nums.length];
        int lenRecord = 0;

        for (int num : nums) {
            int pos = Arrays.binarySearch(lens, 0, lenRecord, num);

            if (pos < 0) pos = -(pos + 1);
            lens[pos] = num;
           
            if (pos == lenRecord) lenRecord ++;
        }

        return lenRecord;
    }
}