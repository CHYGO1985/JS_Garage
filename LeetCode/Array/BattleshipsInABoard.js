/**
 * @param {character[][]} board
 * @return {number}
 * 
 * @jingjiejiang Jun 2, 2019
 */
const isShipStart = (board, row, col) => {
    return (board[row][col] === 'X'
            && (row == 0 || board[row - 1][col] === '.')
            && (col == 0 || board[row][col - 1] === '.'));
} 

var countBattleships = function(board) {
    return board.reduce((count, row, rowIndex) => {
        const shipStartsInRow = row.reduce((count, col, colIndex) => {
            return count + (isShipStart(board, rowIndex, colIndex) ? 1 : 0);
        }, 0);
        return count + shipStartsInRow;
    }, 0);
};