import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @jingjiejiang Oct 26, 2019
 */
class Solution {
  public boolean wordBreak(String s, List<String> wordDict) {
      
    if (s == null || s.length() == 0) return false;

        boolean[] splitStatus = new boolean[s.length() + 1];
        splitStatus[0] = true;
        Set<String> wordSets = new HashSet<>();
        for (String word : wordDict) {
          wordSets.add(word);
        }

        for (int rightIdx = 1; rightIdx <= s.length(); rightIdx ++) {
          for (int leftIdx = 0; leftIdx < rightIdx; leftIdx ++) {
            if (splitStatus[leftIdx] && wordSets.contains(s.substring(leftIdx, rightIdx))) {
              splitStatus[rightIdx] = true;
              break;
            }
          }
        }
        
        return splitStatus[splitStatus.length - 1];
  }
}