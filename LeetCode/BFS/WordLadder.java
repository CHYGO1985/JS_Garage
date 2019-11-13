import java.util.HashSet;
import java.util.LinkedList;
import java.util.Queue;

/**
 * @jingjiejiang Nov 13, 2019
 */
class WordLadder {
  public int ladderLength(String beginWord, String endWord, List<String> wordList) {

    Set<String> words = new HashSet<>(wordList);
    Queue<String> queue = new LinkedList<>();

    queue.offer(beginWord);
    int step = 1;

    while (queue.isEmpty() == false) {
        
        int size = queue.size();
      for (int cnt = 0; cnt < size; cnt ++) {
        String curWord = queue.poll();

        for (int idx = 0; idx < curWord.length(); idx ++) {
          for (char letter = 'a'; letter < 'z'; letter ++) {
            StringBuilder wordBuilder = new StringBuilder(curWord);
            wordBuilder.setCharAt(idx, letter);
            String newWord = wordBuilder.toString();
            if (words.contains(newWord)) {
              if (newWord.equals(endWord)) {
                return step + 1;
              } 
              words.remove(newWord);
              queue.offer(newWord);
            }
          }
        }
      }

      step ++;
    }

    return 0;
  }
}
