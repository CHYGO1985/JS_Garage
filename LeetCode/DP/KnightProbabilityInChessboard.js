/**
 * @param {number} N
 * @param {number} K
 * @param {number} r
 * @param {number} c
 * @return {number}
 * 
 * @jingjiejiang 13, 2019
 */
var knightProbability = function(N, K, r, c) {
    
  let stepCnts = [...Array(N)].fill(1).map(_ => [...Array(N)].fill(1)); 
  const dirs = [[-1,-2], [-2,-1],[-2,1], [-1,2],
                [1,2], [2,1], [2,-1], [1,-2]];
  for (let time = 0; time < K; time ++) {
    const curStepCnts = [...Array(N)].fill(0).map(_ => [...Array(N)].fill(0));
    for (let row = 0; row < N; row ++) {
      for (let col = 0; col < N; col ++) {
        for (let dir of dirs) {
          let curRow = row + dir[0], curCol = col + dir[1];
          if (curRow < 0 || curRow >= N || curCol < 0 || curCol >= N) continue;
          curStepCnts[row][col] += stepCnts[curRow][curCol];
        }
      }
    }
    stepCnts = curStepCnts;
  }

  return stepCnts[r][c] / Math.pow(8, K);
};