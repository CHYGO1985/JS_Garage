import java.util.Arrays;

/**
 * @jingjiejiang Nov 18, 2019
 */
class FindServer {
  
  public static int getServer(int row, int col, int[][] grids) {

    int[][] dirs = {{0, -1}, {0, 1}, {-1, 0}};
    int[][] tmp = new int[row][col];

    for (int rowIdx = 0; rowIdx < row; rowIdx ++) {
      System.arraycopy(grids[rowIdx], 0, tmp[rowIdx], 0, col);
    }

    int hrs = 0;

    long curSvrs = 0;
    long addedSvrs = 0;
    while (curSvrs + addedSvrs < row * col) {

      hrs ++;
      curSvrs = 0;
      for (int rowIdx = 0; rowIdx < row; rowIdx ++) {
        for (int colIdx = 0; colIdx < col; colIdx ++) {

          if (grids[rowIdx][colIdx] == 1) {
            curSvrs ++;
            continue;
          }

          for (int dirsIdx = 0; dirsIdx < dirs.length; dirsIdx ++) {
            int newRow = rowIdx + dirs[dirsIdx][0];
            int newCol = colIdx + dirs[dirsIdx][1];

            if (newRow < 0 || newRow >= row || newCol < 0 || newCol >= col 
              || grids[newRow][newCol] == 0 || tmp[rowIdx][colIdx] == 1) continue;
            
            tmp[rowIdx][colIdx] = 1; 
            curSvrs ++;
          }
        }
      }

      for (int rowIdx = 0; rowIdx < row; rowIdx ++) {
        System.arraycopy(tmp[rowIdx], 0, grids[rowIdx], 0, col);
      }
    }
    
    return hrs;
  }

  public static void main(String[] args){

    int[][] grids = {
      {1,0,0,0,0},
      {0,1,0,0,0},
      {0,0,1,0,0},
      {0,0,0,1,0},
      {0,0,0,0,1}
    };

    // System.out.println(getServer(5, 5, grids));

    // test array copy
    int[] arr = {0, 1};
    int[] arr1 = Arrays.copyOf(arr, arr.length);
    arr1[1] = 2;

    System.out.println(arr[1]);
  }
}