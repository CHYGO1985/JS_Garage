/**
 * @jingjiejiang Oct 23, 2019
 */
class WordBreak {

    // recur + memo
    /*
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
    */   

    // DP
    public int minDistance(String word1, String word2) {
        
      int rowLen = word1.length() + 1, colLen = word2.length() + 1;
      int[][] minDists = new int[rowLen][colLen];

      for (int row = 0; row < rowLen; row ++) minDists[row][0] = row;
      for (int col = 0; col < colLen; col ++) minDists[0][col] = col;

      for (int row = 1; row < rowLen; row ++) {
        for (int col = 1; col < colLen; col ++) {
          char char1 = word1.charAt(row - 1), char2 = word2.charAt(col - 1);
          if (char1 == char2) {
            minDists[row][col] = minDists[row - 1][col - 1];
          } else {
            // add: [row][col - 1], del: [row - 1][col]
            minDists[row][col] = Math.min(minDists[row - 1][col], 
                                    Math.min(minDists[row][col - 1], minDists[row - 1][col - 1])) + 1;
          }
        }
      }

      return minDists[rowLen - 1][colLen - 1];
    }
}