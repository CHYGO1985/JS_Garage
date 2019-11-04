import java.util.Arrays;

/**
 * @jingjiejiang Nov 4, 2019
 */
class RussianDollEnvelopes {
  
  // DP
  public int maxEnvelopes(int[][] envelopes) {
      
    if (envelopes == null || envelopes.length == 0 || envelopes[0].length == 0) return 0;

    int[] cnts = new int[envelopes.length];
    cnts[0] = 1;
    int res = cnts[0];
    Arrays.fill(cnts, 1);
    Arrays.sort(envelopes, (int[] a, int[] b) -> 
      (a[0] == b[0] ? a[1] - b[1] : a[0] - b[0])
    );

    for (int right = 1; right < envelopes.length; right ++) {
      for (int left = 0; left < right; left ++) {
        if (envelopes[left][0] < envelopes[right][0] && envelopes[left][1] < envelopes[right][1]) {
          cnts[right] = Math.max(cnts[right], cnts[left] + 1);
        }
      }
        
      res = Math.max(res, cnts[right]);
    }

    return res;
  }
}