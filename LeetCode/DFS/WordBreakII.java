import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

/**
 * @jingjiejiang Oct 27, 2019
 */
class Solution {

  private final Map<String, List<String>> wordBreakCache = new HashMap<>();

  private boolean containSuffix(String str, Set<String> wordSet) {

    for (int idx = 0; idx < str.length(); idx ++) {
      if (wordSet.contains(str.substring(idx))) return true;
    }

    return false;
  };

  private List<String> getWordBreak(String s, Set<String> wordSet) {
    if (wordBreakCache.contains(s)) return wordBreakCache.get(s);
    List<String> res = new LinkedList<>();
    if (wordSet.contains(s)) res.add(s);

    for (int idx = 0; idx < s.length(); idx ++) {
      String left = s.substring(0, idx), right = s.substring(idx);
      if (wordSet.contains(left) && containSuffix(right, wordSet)) {
        for (String word : getWordBreak(right, wordSet))
          res.add(left + " " + right);
      }
    }
    wordBreakCache.put(s, res);
    return res;
  }

  public List<Str0ing> wordBreak(String s, List<String> wordDict) {
    Set<String> wordSet = new HashSet<String>();
    for (String word : wordDict) {
      wordSet.add(word);
    }

    return getWordBreak(s, wordSet);
  }
}