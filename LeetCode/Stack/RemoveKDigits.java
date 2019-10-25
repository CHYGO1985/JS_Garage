/**
 * @jingjiejiang Oct 25, 2019
 */
class RemoveKDigits {
    public String removeKdigits(String num, int k) {
        if (num == null || num.length() == 0) return "";

        char[] res = new char[num.length() - k];
        int topIdx = 0;

        for (int idx = 0; idx < num.length(); idx ++) {
            char curChar = num.charAt(idx);
            while (topIdx > 0 && curChar < res[topIdx - 1] && num.length() - idx + topIdx > res.length) {
                topIdx --;
            }
            if (topIdx < res.length) res[topIdx ++] = curChar;
        }

        int startIdx = 0;
        while (startIdx < res.length && res[startIdx] == '0') startIdx ++;

        return startIdx == res.length ? "0" : new String(res, startIdx, res.length - startIdx);
    }
}