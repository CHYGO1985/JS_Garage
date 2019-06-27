/**
 * Initialize your data structure here.
 * @param {number} n
 * 
 * @jingjiejiang Jun 26, 2019
 * ref: https://leetcode.com/problems/design-tic-tac-toe/discuss/81898/Java-O(1)-solution-easy-to-understand in comments
 */
var TicTacToe = function(n) {
    
    rowCount = new Array(n);
    rowCount.fill(0);
    colCount = new Array(n);
    colCount.fill(0);
    diagonal = 0;
    antiDiagonal = 0;
    len = n;
};

/**
 * Player {player} makes a move at ({row}, {col}).
        @param row The row of the board.
        @param col The column of the board.
        @param player The player, can be either 1 or 2.
        @return The current winning condition, can be either:
                0: No one wins.
                1: Player 1 wins.
                2: Player 2 wins. 
 * @param {number} row 
 * @param {number} col 
 * @param {number} player
 * @return {number}
 * 
 */
TicTacToe.prototype.move = function(row, col, player) {
    
    let val = player == 1? 1 : -1;
    let target = player == 1? len : -len;

    if (row == col) {
        diagonal += val;
    }
    if (row + col === len - 1) {
        antiDiagonal += val;    
    }

    rowCount[row] += val;
    colCount[col] += val;
    
    return (diagonal === target || antiDiagonal === target || rowCount[row] === target || colCount[col] === target) ? player : 0;
};

/** 
 * Your TicTacToe object will be instantiated and called as such:
 * var obj = new TicTacToe(n)
 * var param_1 = obj.move(row,col,player)
 */