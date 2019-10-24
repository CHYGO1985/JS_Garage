import java.util.LinkedList;
import java.util.List;

/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */

/**
 * @jingjiejiang Oct 24, 2019
 */
class Solution {
    public class TreeNode {
      int val;
      TreeNode left;
      TreeNode right;
      TreeNode(int x) { val = x; }
    }

    public List<TreeNode> generateTrees(int n) {
        List<TreeNode> list = new LinkedList<>();
        if (n == 0) return list;

        // use a hashmap : "low#high" -- List<TreeNode> for record previous status

        return genTreesHelper(1, n);
    }

    private List<TreeNode> genTreesHelper(int low, int high) {
        List<TreeNode> res = new LinkedList<>();  
        if (low > high) {
            res.add(null);
            return res;
        }

        for (int cnt = low; cnt <= high; cnt ++) {
            List<TreeNode> leftNodes = genTreesHelper(low, cnt - 1);
            List<TreeNode> rightNodes = genTreesHelper(cnt + 1, high);

            for (TreeNode leftNode : leftNodes) {
              for (TreeNode rightNode : rightNodes) {
                TreeNode root = new TreeNode(cnt);
                root.left = leftNode;
                root.right = rightNode;
                res.add(root);
              }
            }
        }

        return res;
    }
}