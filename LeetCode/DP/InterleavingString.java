/**
 * @jingjiejiang Nov 7, 2019
 */
class InterleavingString {
  // DP
  public boolean isInterleave(String s1, String s2, String s3) {
      
    // edge case
    if (s1 == null || s2 == null) return false;
    if (s1.length() + s2.length() != s3.length()) return false;

    boolean[][] matchMatrix = new boolean[s1.length() + 1][s2.length() + 1];
    matchMatrix[0][0] = true;

    // when do not use any char from s2
    for (int row = 0; row < matchMatrix.length; row ++) 
      matchMatrix[row][0] = matchMatrix[row - 1][0] == true 
        && s1.charAt(row - 1) == s3.charAt(row - 1) ? true : false;

    // when do not use any char from s1
    for (int col = 0; col < matchMatrix[0].length; col ++)
      matchMatrix[0][col] = matchMatrix[0][col - 1] == true
        && s2.charAt(col - 1) == s3.charAt(col - 1) ? true : false;

    for (int row = 1; row < matchMatrix.length; row ++) {
      for (int col = 1; col < matchMatrix[0].length; col ++) {
        matchMatrix[row][col] = (matchMatrix[row - 1][col] == true && s1.charAt(row - 1) == s3.charAt(row + col - 1))
              || (matchMatrix[row][col - 1] == true && s2.charAt(col - 1) == s3.charAt(row + col - 1));
      }
    }

    return matchMatrix[s1.length()][s2.length()];
  }
}