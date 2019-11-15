/**
 * @jingjiejiang Nov 14, 2019
 */
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