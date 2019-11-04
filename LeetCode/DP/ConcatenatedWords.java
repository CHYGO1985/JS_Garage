import java.lang.WeakPairMap.Pair.Weak;
import java.util.Arrays;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

/**
 * @jingjiejiang Nov 2, 2019
 */
class ConcatenatedWords {

  // method 1: recursive
  public List<String> findAllConcatenatedWordsInADict(String[] words) {
    List<String> res = new LinkedList<>();
    if (words == null || words.length == 0)
      return res;

    Set<String> wordsSet = new HashSet<>();
    for (String word : words) {
      wordsSet.add(word);
    }

    for (String word : words) {
      boolean[] memo = new boolean[word.length() + 1];
      Arrays.fill(memo, false);
      if (getConcWords(word, wordsSet, memo, 0, 0))
        res.add(word);
    }

    return res;
  }

  private boolean getConcWords(String word, Set<String> wordsSet, boolean[] memo, int startPos, int cnt) {
    if (startPos >= word.length() && cnt >= 2)
      return true;
    if (memo[startPos])
      return true;

    for (int idx = startPos + 1; idx <= word.length(); idx++) {

      if (wordsSet.contains(word.substring(startPos, idx)) && getConcWords(word, wordsSet, memo, idx, cnt + 1)) {
        memo[startPos] = true;
        return true;
      }
    }

    return false;
  }

  // DP
  public List<String> findAllConcatenatedWordsInADict_DP(String[] words) {

    List<String> res = new LinkedList<>();
    if (words == null || words.length == 0)
      return res;

    Set<String> wordsSet = new HashSet<>();
    for (String word : words) {
      wordsSet.add(word);
    }

    for (String word : words) {
      // avoid test case like [""], it should return [], but if not add this, will return []
      if (word.length() == 0) continue;
      wordsSet.remove(word);
      boolean[] breakPos = new boolean[word.length() + 1];
      Arrays.fill(breakPos, false);
      breakPos[0] = true;

      if (canGetFromDict(word, wordsSet, breakPos)) res.add(word);
      wordsSet.add(word);
    }

    return res;
  }

  private boolean canGetFromDict(String word, Set<String> wordsSet, boolean[] breakPos) {

    for (int rightIdx = 1; rightIdx < breakPos.length; rightIdx ++) {
      for (int leftIdx = 0; leftIdx < rightIdx; leftIdx ++) {
        if (breakPos[leftIdx] && wordsSet.contains(word.substring(leftIdx, rightIdx))) {
          breakPos[rightIdx] = true;
          break;
        }
      }
    }
    return breakPos[breakPos.length - 1];
  }

}