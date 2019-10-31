/**
 * @jingjiejiang Oct 31, 2019
 */
class OneEditDistance {
    public boolean isOneEditDistance(String s, String t) {
        
        // exception handling
        int rowLen = s.length() + 1, colLen = t.length() + 1;
        int[][] dists = new int[rowLen][colLen];
        
        for (int row = 0; row < rowLen; row ++) dists[row][0] = row;
        for (int col = 0; col < colLen; col ++) dists[0][col] = col;
                
        for (int row = 1; row < rowLen; row ++) {
            for (int col = 1; col < colLen; col ++) {
                if (s.charAt(row - 1) == t.charAt(col - 1)) {
                    dists[row][col] = dists[row - 1][col - 1];
                } else {
                    dists[row][col] = Math.min(dists[row- 1][col], 
                                               Math.min(dists[row][col - 1], dists[row - 1][col - 1])) + 1;
                }
            }
        }
        
        return dists[rowLen- 1][colLen - 1] == 1? true : false;
    }
}