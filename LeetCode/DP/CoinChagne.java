import java.util.Arrays;

/**
 * @jingjeijiang Oct 10, 2019
 */
class Solution {
  public int coinChange(int[] coins, int amount) {
    if (coins == null || coins.length == 0 || amount == 0) return 0;

    int[] changes = new int[amount + 1];
    Arrays.fill(changes, amount + 1);
    changes[0] = 0;

    for (int idx = 1; idx < changes.length; idx ++) {
      for (int coinIdx = 0; coinIdx < coins.length; coinIdx ++) {
        if (coins[coinIdx] <= idx) {
          changes[idx] = Math.min(changes[idx], changes[idx - coins[coinIdx]] + 1);
        }
      }
    }

     // cannot use changes[amount] == amount for test case [1] 1
    return changes[amount] > amount ? -1 : changes[amount];
  }
}