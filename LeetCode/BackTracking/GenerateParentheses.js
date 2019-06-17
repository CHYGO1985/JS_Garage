/**
 * @param {number} n
 * @return {string[]}
 * 
 * @jingjiejiang Jun 17, 2019
 */
var generateParenthesis = function (n) {

    let open = 0;
    let close = 0;
    let res = [];
    let tmpRes = [];

    const getParenthesis = (open, close, tmpRes) => {

        if (open === n && close === n) {

            res.push(tmpRes.join(""));
            return;
        }

        if (open < n) {
            tmpRes.push("(");
            getParenthesis(open + 1, close, tmpRes);
            tmpRes.pop();
        }

        if (close < open) {
            tmpRes.push(")");
            getParenthesis(open, close + 1, tmpRes);
            tmpRes.pop();
        }
    };

    getParenthesis(0, 0, tmpRes);

    return res;
};