/**
 * @param {number} n
 * @return {string[]}
 * 
 * @jingjiejiang Sep 20, 2019
 */
var generateParenthesis = function(n) {
    
    let res = [];

    const parBuilder = (curStr, open, close) => {
        if (curStr.length === n*2) {
            res.push(curStr.join(""));
            return ;
        }

        if (open > 0) {
            curStr.push("(");
            parBuilder(curStr, open - 1, close);
            curStr.pop();
        }

        if (close > open) {
            curStr.push(")");
            parBuilder(curStr, open, close - 1);
            curStr.pop();
        }
    }

    parBuilder(new Array(), n, n);

    return res;
};