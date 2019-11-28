import java.util.LinkedList;
import java.util.List;

/**
 * @jingjiejiang Nov 28, 2019
 */
public class TreeNode {
  int val;
  TreeNode left;
  TreeNode right;
  TreeNode(int x) { val = x; }
}

public class Codec {

  // Encodes a tree to a single string.
  public String serialize(TreeNode root) {
      if (root == null) return "#!";

      String res = root.val + "!";
      res += serialize(root.left);
      res += serialize(root.right);

      return res;
  }

  // Decodes your encoded data to tree.
  public TreeNode deserialize(String data) {
      
    if (data == null || data.length() == 0) return null;

    List<String> valList = new LinkedList<>();
    String[] vals = data.split("!");

    for (String val : vals) {
      valList.add(val);
    }

    return deserializer(valList);
  }

  private TreeNode deserializer(List<String> valList) {
    String val = valList.remove(0);
    if (val.equals("#")) return null;

    TreeNode root = new TreeNode(Integer.valueOf(val));

    root.left = deserializer(valList);
    root.right = deserializer(valList);
    
    return root;
  }
}

// Your Codec object will be instantiated and called as such:
// Codec codec = new Codec();
// codec.deserialize(codec.serialize(root));