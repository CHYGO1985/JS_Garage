/**
 * @param {string} s
 * @return {number}
 * 
 * @jingjiejiang Sep 24, 2019
 */
var calculate = function(s) {
    
    if (s == null || s.length === 0) return undefined;

    // store op as temp data will be better than store number
    let res = 0, curNum = 0, neg = false, op = '+'
    for (let idx = 0; idx < s.length; idx ++) {
        const chr = s.charAt(idx);
        switch (chr) {
            case '+':
                numStack.push(curNum);
                curNum = 0;
                neg = false;
                break;
            case '-':
                numStack.push(curNum);
                curNum = 0;
                neg = true;
                break;
            case '*':
                const leftNum = numStack.pop();
                const rightNum = parseInt(s.charAt(++ idx));
                const res = 
                numStack.push(leftNum * rightNum);
                break;
            case '/':
                const leftNum = numStack.pop();
                const rightNum = parseInt(s.charAt(++ idx));
                numStack.push(leftNum / rightNum);
                break;
            case ' ': break;
            default:
                curNum = curNum * 10 + parseInt(chr);
                break;
        }
    }
};