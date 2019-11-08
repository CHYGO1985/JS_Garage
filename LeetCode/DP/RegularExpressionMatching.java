/**
 * @jingjiejiang Nov 8, 2019
 */
class RegularExpressionMatching {
  public boolean isMatch(String s, String p) {
      
    if (s == null || p == null) return false;

    boolean[][] matches = new boolean[s.length() + 1][p.length() + 1];
    matches[0][0] = true;

    // assume there will not be exceptions like * for p string 
    for (int col = 0; col < p.length(); col++) {
      if (p.charAt(col) == '*' && matches[0][col - 1]) {
        matches[0][col + 1] = true;
      }
    }

    for (int row = 0; row < matches.length - 1; row ++) {
      for (int col = 0; col < matches[0].length - 1; col ++) {
        if (s.charAt(row) == p.charAt(col) || p.charAt(col) == '.') {
          matches[row + 1][col + 1] = matches[row][col];
        }

        if (p.charAt(col) == '*') {
          if (p.charAt(col - 1) != s.charAt(row) && p.charAt(col - 1) != '.') {
            matches[row + 1][col + 1] = matches[row + 1][col - 1]; // empty
          } else {
            matches[row + 1][col + 1] = matches[row][col + 1] // multi same chars
              || matches[row + 1][col] // single char
              || matches[row + 1][col - 1]; // empty
          }
        }
      }
    }

    return matches[s.length()][p.length()];

    return matches[s.length()][p.length()];
  }
}