/**
 * @param {string} s
 * @return {string[]}
 * 
 * @jingjiejiang Sep 25, 2019
 */
var restoreIpAddresses = function(s) {
    
    const res = []
    if (s == null || s.length === 0) return res;

    const buildIp = (curStr, segCnt, tmpIp) => {

        if (segCnt === 4) {
            if (curStr && curStr.length === 0) res.push(segCnt);
            return ;
        }

        for (let cnt = 1; cnt < 4; cnt ++) {
            if (curStr.length < cnt) break;

            const val = parseInt(curStr.substring(0, cnt));
            if (val > 225 || cnt !== val.toString().length) continue;
            buildIp(curStr.substring(cnt), segCnt + 1, tmpIp + curStr.substring(0, cnt)
             + (segCnt === 3 ? "" : "."));
        }
    }

    buildIp(s, 0, "");

    return res;
};