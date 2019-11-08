/**
 * @jingjiejiang Nov 8, 2019
 */
class RegularExpressionMatching {
  public boolean isMatch(String s, String p) {
      
    if (s == null || p == null) return false;

    boolean[][] matches = new boolean[s.length() + 1][p.length() + 1];
    matches[0][0] = true;

    // assume there will not be exceptions like only one char “*” for p string 
    for (int col = 1; col < matches[0].length; col++) {
      // this is for checking "c*" can be seem as empty, so compare with col - 2
      // there is no need to comapre single char for "c*", as they are comparing with empty char 
      if (p.charAt(col - 1) == '*' && matches[0][col - 2]) {
        matches[0][col] = true;
      }
    }

    for (int row = 1; row < matches.length; row ++) {
      for (int col = 1; col < matches[0].length; col ++) {
        if (s.charAt(row - 1) == p.charAt(col - 1) || p.charAt(col - 1) == '.') {
          matches[row][col] = matches[row - 1][col - 1];
        }

        if (p.charAt(col - 1) == '*') {
          if (p.charAt(col - 2) != s.charAt(row - 1) && p.charAt(col - 2) != '.') {
            matches[row][col] = matches[row][col - 2]; // empty
          } else {
            matches[row][col] = matches[row - 1][col] // multi same chars
              || matches[row][col - 1] // single char
              || matches[row][col - 2]; // empty
          }
        }
      }
    }

    return matches[s.length()][p.length()];
  }
}