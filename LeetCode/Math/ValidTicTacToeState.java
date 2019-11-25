/**
 * @jingjiejiang Nov 25, 2019
 */
class ValidTicTacToeState {
    public boolean validTicTacToe(String[] board) {
        
      if (board == null || board.length == 0) return false;

      int[] rows = new int[board.length];
      int[] cols = new int[board[0].length()];
      int diag = 0, antiDiag = 0;
      int turns = 0;
      boolean xWin = false, oWin = false;

      for (int row = 0; row < board.length; row ++) {
        String curStr = board[row];
        for (int col = 0; col < curStr.length(); col ++) {
          char curLetter  = curStr.charAt(col);
          if (curLetter == 'X') {
            rows[row] += 1;
            cols[col] += 1;
            if (row == col) diag ++;
            if (row + col == 2) antiDiag ++;
            turns ++;
          } else if (curLetter == 'O') {
            rows[row] -= 1;
            cols[col] -= 1;
            if (row == col) diag --;
            if (row + col == 2) antiDiag --;
            turns --;
          }
        }
      }

      xWin = rows[0] == 3 || rows[1] == 3 || rows[2] == 3
          || cols[0] == 3 || cols[1] == 3 || cols[2] == 3
          || diag == 3 || antiDiag == 3;
      oWin = rows[0] == -3 || rows[1] == -3 || rows[2] == -3
          || cols[0] == -3 || cols[1] == -3 || cols[2] == -3
          || diag == -3 || antiDiag == -3;

      if ( (xWin && turns == 0) || (oWin && turns == 1) ) {
        return false;
      }

      return (turns == 0 || turns == 1) && (!xWin || !oWin);
    }
}
