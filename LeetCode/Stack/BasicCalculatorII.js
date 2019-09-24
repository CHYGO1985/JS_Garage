/**
 * @param {string} s
 * @return {number}
 * 
 * @jingjiejiang Sep 24, 2019
 */
var calculate = function(s) {
    
    if (s == null || s.length === 0) return undefined;

    // store op as temp data will be better than store number
    let res = 0, curNum = 0, numStack = [], op = '+';
    for (let idx = 0; idx < s.length; idx ++) {
        const chr = s.charAt(idx);
        if (chr >= '0' && chr <= '9') {
            curNum = curNum * 10 + parseInt(chr);
        } 
        
        if (((chr < '0' || chr > '9') && chr !== ' ') || (idx === s.length - 1)){
            if (op === '+') numStack.push(curNum);
            else if (op === '-') numStack.push(- curNum);
            else { //(chr === '*' || chr === '/')
                    
                const preNum = numStack.pop();
                let isNeg = preNum < 0 ? true : false;
                let res = op === '*' ? Math.abs(preNum) * curNum : Math.floor( Math.abs(preNum) / curNum);
                res = isNeg ? - res : res;
                numStack.push(res);
            }

            curNum = 0;
            op = chr;
        }
    }

    while (numStack.length > 0) {
        res += numStack.pop();
    }

    return res;
};