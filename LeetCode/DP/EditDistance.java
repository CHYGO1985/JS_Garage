/**
 * @jingjiejiang Oct 30, 2019
 */
class EditDistance {
    public int minDistance(String word1, String word2) {
        
        if (word1.length() == 0 && word2.length() == 0) return 0;
        if (word1.length() == 0) return word2.length();
        if (word2.length() == 0) return word1.length();

        return getMinDist(word1, 0, word2, 0, new int[word1.length()][word2.length()]);
    }

    private int getMinDist(String word1, int idx1, String word2, int idx2, int[][] memo) {
        if (idx1 == word1.length()) return word2.length() - idx2;
        if (idx2 == word2.length()) return word1.length() - idx1;
        if (memo[idx1][idx2] > 0) return memo[idx1][idx2];

        int res = 0;
        if (word1.charAt(idx1) == word2.charAt(idx2)) {
            return getMinDist(word1, idx1 + 1, word2, idx2 + 1, memo);
        } else {
            int insert = getMinDist(word1, idx1, word2, idx2 + 1, memo);
            int delete = getMinDist(word1, idx1 + 1, word2, idx2, memo);
            int replace = getMinDist(word1, idx1 + 1, word2, idx2 + 1, memo);

            res = Math.min(insert, Math.min(delete, replace));
        }
        memo[idx1][idx2] = res;

        return res;
    }
}