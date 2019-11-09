import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

/**
 * @jingjiejiang Oct 27, 2019
 */
class WordBreakII {

  private final Map<String, List<String>> wordBreakCache = new HashMap<>();

  private boolean containSuffix(String str, Set<String> wordSet) {

    for (int idx = 0; idx < str.length(); idx ++) {
      if (wordSet.contains(str.substring(idx))) return true;
    }

    return false;
  };

  private List<String> getWordBreak(String s, Set<String> wordSet) {
    // if the memo has a record, return it
    if (wordBreakCache.contains(s)) return wordBreakCache.get(s);
    List<String> res = new LinkedList<>();
    // if set has s, then add it to res
    if (wordSet.contains(s)) res.add(s);

    for (int idx = 0; idx < s.length(); idx ++) {
      String left = s.substring(0, idx), right = s.substring(idx);
      if (wordSet.contains(left) && containSuffix(right, wordSet)) {
        // if the the right cannot be splitted, then it will return null
        // as the res.add will not be executed
        // so the res for the parent loop will be none
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