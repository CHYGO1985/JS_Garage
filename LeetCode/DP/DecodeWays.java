/**
 * @jingjiejiang Oct 29, 2019
 */
class DecodeWays {
    public int numDecodings(String s) {
        
        if (s == null || s.length() == 0) return 0;

        int[] ways = new int[s.length() + 1];
        ways[0] = 1;

        for (int idx = 1; idx < ways.length; idx ++) {
            ways[idx] = s.charAt(idx - 1) == '0' ? 0 : ways[idx - 1];
            if (idx > 1 && (s.charAt(idx - 2) == '1' ||
                            (s.charAt(idx - 2) == '2' && s.charAt(idx - 1) <= '6'))) {
                ways[idx] += ways[idx - 2];
           }
        }

        
        return ways[ways.length - 1];
    }
}