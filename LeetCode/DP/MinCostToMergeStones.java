/**
 * @jingjiejiang Nov 17, 2019
 */
class MinCostToMergeStones {
    public int mergeStones(int[] stones, int K) {
        
        int pilesLen = stones.length;
        if (stones == null || pilesLen == 0) return 0;
        if ( (pilesLen - 1) % (K - 1) != 0) return -1;

        int[][] costs = new int[pilesLen][pilesLen];
        for (int row = 0; row < pilesLen; row ++) {
            for (int col = 0; col < pilesLen; col ++) {
                costs[row][col] = row == col ? 0 : Integer.MAX_VALUE;
            }
        }

        int[] sums = new int[pilesLen + 1];
        for (int idx = 0; idx < pilesLen; idx ++) {
            sums[idx + 1] = sums[idx] + stones[idx];
        }

        for (int partLen = 2; partLen <= pilesLen; partLen ++) {
            // System.out.println("partLen: " + partLen);
            for (int leftIdx = 0; leftIdx < pilesLen - partLen + 1; leftIdx ++) {
                int rightIdx = leftIdx + partLen - 1;
                // when splitIdx = i, it get the whole leftIdx to rightIdx, there is not need to get 
                // splitIdx = rightIdx, to get the dup result
                for (int splitIdx = leftIdx; splitIdx < rightIdx; splitIdx += K - 1) {

                    // ** there is no need to add these sentence, as when partLen = 2, every base costs elements will be updated
                    // ** with costs[idx][idx]
                    // ** the data costs[leftIdx][rightIdx] will be updated when first met (len - 1) % (K -1) = 0

                    // if (costs[leftIdx][splitIdx] == Integer.MAX_VALUE ||
                    //     costs[splitIdx + 1][rightIdx] == Integer.MAX_VALUE) {
                    //         continue;
                    //     }
                    
                    costs[leftIdx][rightIdx] = Math.min(costs[leftIdx][rightIdx],
                        costs[leftIdx][splitIdx] + costs[splitIdx + 1][rightIdx]); 
                }

                if ( (partLen - 1) % (K - 1) == 0) {
                    
                    costs[leftIdx][rightIdx] += sums[rightIdx + 1] - sums[leftIdx];
                }
            }
        }

        return costs[0][pilesLen - 1];
    }
}