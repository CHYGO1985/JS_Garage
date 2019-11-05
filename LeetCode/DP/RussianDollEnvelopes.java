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

  // bianry search
  public int maxEnvelopes1(int[][] envelopes) {
      
    if (envelopes == null || envelopes.length == 0 || envelopes[0].length == 0) return 0;

    int[] cnts = new int[envelopes.length];
    cnts[0] = envelopes[0][1];
    int cntsIdx = 1;
    Arrays.sort(envelopes, (int[] a, int[] b) -> 
      a[0] == b[0] ? b[1] - a[1] : a[0] - b[0]
    );

    for (int idx = 1; idx < envelopes.length; idx ++) {
      int left = 0, right = cntsIdx - 1, compareNum = envelopes[idx][1];

      while (left < right) {
        int mid = left + (right - left) / 2;
        if (left < cnts[mid]) left = mid + 1;
        else right = mid;
      }

      if (right >= cntsIdx) {
        cnts[cntsIdx ++] = compareNum;
      } else {
        cnts[right] = compareNum;
      }
    }

    return cntsIdx + 1;
  } 
}