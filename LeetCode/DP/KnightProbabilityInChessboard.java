import java.util.Arrays;

/**
 * @jingjiejiang Oct 22, 2019
 */
class KnightProbabilityInChessboard {
    public double knightProbability(int N, int K, int r, int c) {

        int[][] dirs = {{1, 2}, {1, -2}, {2, 1}, {2, -1}, {-1, 2}, {-1, -2}, {-2, 1}, {-2, -1}};
        double[][] stepCnts = new double[N][N];

        for (double[] row : stepCnts) {
            Arrays.fill(row, 1);
        }

        for (int times = 0; times < K; times ++) {
            double[][] curSteps = new double[N][N];
            for (int row = 0; row < N; row ++) {
                for (int col = 0; col < N; col ++) {

                    for (int[] dir : dirs) {
                        int newRow = row + dir[0];
                        int newCol = col + dir[1];
                        if (isLegal(N, newRow, newCol)) curSteps[row][col] += stepCnts[newRow][newCol];
                    }
                }
            }

            stepCnts = curSteps;
        }

        return stepCnts[r][c] / Math.pow(8, K);
    }

    private boolean isLegal(int N, int row, int col) {
        return (row >= 0 && row < N && col >= 0 && col < N);
    }

    public static void main(String[] args) {
        // knightProbability(1, 1, 1 ,1);
        // System.out.println("hello world");
    }
}