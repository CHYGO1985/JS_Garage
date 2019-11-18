import java.awt.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;

/**
 * @jingjiejiang Nov 14, 2019
 */
/*
public class WordLadderII {
    public List<List<String>> findLadders(String beginWord, String endWord, List<String> wordList) {
        
        List<List<String>> resList = new ArrayList<>();
        if (wordList.size() == 0)
            return resList;

        int min = Integer.MAX_VALUE;
        
        // words dict
        Set<String> dict = new HashSet<>(wordList);

        // searching queue
        Queue<String> queue = new ArrayDeque<String>();
        queue.add(beginWord);

        // parent map
        Map<String, List<String>> parentsMap = new HashMap<>();

        Map<String, Integer> steps = new HashMap<String, Integer>();
        for (String word : dict)
            steps.put(word, Integer.MAX_VALUE);
        steps.put(beginWord, 0);

        dict.add(endWord);
        // BFS: Dijisktra search
        while (!queue.isEmpty()) {

            String word = queue.poll();

            int step = steps.get(word) + 1; // 'step' indicates how many steps are needed to travel to one word.

            if (step > min)
                break;

            for (int i = 0; i < word.length(); i++) {
                StringBuilder builder = new StringBuilder(word);
                for (char ch = 'a'; ch <= 'z'; ch++) {
                    builder.setCharAt(i, ch);
                    String new_word = builder.toString();
                    if (steps.containsKey(new_word)) {

                        if (step > steps.get(new_word))// Check if it is the shortest path to one word.
                            continue;
                        
                        if (step < steps.get(new_word)) {
                            queue.add(new_word);
                            steps.put(new_word, step);
                        }
                        // It is a KEY line. If one word already appeared in one ladder,
                        // Do not insert the same word inside the queue twice. Otherwise it gets TLE.

                        // Build adjacent Graph
                        if (parentsMap.containsKey(new_word)) 
                        parentsMap.get(new_word).add(word);
                        else {
                            List<String> list = new LinkedList<String>();
                            list.add(word);
                            parentsMap.put(new_word, list);
                            // It is possible to write three lines in one:
                            // map.put(new_word,new LinkedList<String>(Arrays.asList(new String[]{word})));
                            // Which one is better?
                        }

                        if (new_word.equals(endWord))
                            min = step;

                    } // End if dict contains new_word
                } // End:Iteration from 'a' to 'z'
            } // End:Iteration from the first to the last
        } // End While

        // BackTracking
        List<String> tmpList = new LinkedList<String>();
        backTrace(endWord, beginWord, tmpList, resList, parentsMap);

        return resList;
    }

    private void backTrace(String word, String start, List<String> tmplist, 
                           List<List<String>> resList, Map<String, List<String>> parentsMap) {
        if (word.equals(start)) {
            List<String> addList = new ArrayList<>(tmplist);
            addList.add(0, start);
            resList.add(addList);
            return;
        }
        
        tmplist.add(0, word);
        if (parentsMap.get(word) != null)
            for (String s : parentsMap.get(word))
                backTrace(s, start, tmplist, resList, parentsMap);
        tmplist.remove(0);
    }
}
*/

public class WordLadderII {
    // ** forward parent graph method
    public List<List<String>> findLadders(String beginWord, String endWord, List<String> wordList) {
        
        List<List<String>> resList = new ArrayList<>();
        if (wordList.size() == 0) return resList;

        int minDepth = Integer.MAX_VALUE;

        Queue<String> queue = new LinkedList<>();
        queue.offer(beginWord);

        // word : depth map
        Map<String, Integer> wordDepthMap = new HashMap<>();
        for (String word : wordList) {
            wordDepthMap.put(word, Integer.MAX_VALUE);
        }
        wordDepthMap.put(beginWord, 0);
        // BFS parents map
        Map<String, List<String>> parentsMap = new HashMap<>();

        while (queue.isEmpty() == false) {

            String curWord = queue.poll();

            int depth = wordDepthMap.get(curWord) + 1;
            if (depth > minDepth) break; // as the word in the queue must >= curWord

            for (int idx = 0; idx < curWord.length(); idx ++) {
                for (char letter = 'a'; letter < 'z'; letter ++) {
                    StringBuilder wordBuilder = new StringBuilder(curWord);
                    wordBuilder.setCharAt(idx, letter);
                    String newWord = wordBuilder.toString();

                    // check if newWord exist in the list
                    if (wordDepthMap.containsKey(newWord)) {
                        if (depth > wordDepthMap.get(newWord)) continue;

                        // if current depth < newWord old depth, update it
                        if (depth < word+DepthMap.get(newWord)) {
                            queue.add(newWord);
                            wordDepthMap.put(newWord, depth);
                        }

                        // add newWord to the curWord parents list
                        List<String> parentList = parentsMap.getOrDefault(newWord, new LinkedList<>());
                        parentList.add(curWord);
                        parentsMap.put(newWord, parentList);
                    }

                    if (newWord.equals(endWord)) minDepth = depth;
                }
            }
        }

        List<String> tmpList = new LinkedList<>();
        backTrace(endWord, beginWord, tmpList, resList, parentsMap);
        
        return resList;
    }

    private void backTrace(String childWord, String parentWord, List<String> tmplist, 
                           List<List<String>> resList, Map<String, List<String>> parentsMap) {
        
        if (childWord.equals(parentWord)) {
            List<String> addList = new ArrayList<>(tmplist);
            addList.add(0, childWord);
            resList.add(addList);
            return ;
        }

        if (parentsMap.get(childWord) != null) {
            for (String word : parentsMap.get(childWord)) {
                tmplist.add(0, childWord);
                backTrace(word, parentWord, tmplist, resList, parentsMap);
                tmplist.remove(0);
            }
        }
    }
}