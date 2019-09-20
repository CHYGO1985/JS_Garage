/**
 * @param {string[]} strs
 * @return {string[][]}
 * 
 * @jingjiejiang Sep 20, 2019
 */
var groupAnagrams = function(strs) {
    const res = [], strWordMap = {};
    if (strs == null || strs.length === 0) return res;

    for (let str of strs) {
        const strKeyArr = Array(26).fill(0);
        // for (let idx = 0; idx < str.length; idx ++) {
        //     let strKeyArrIdx = str.charCodeAt(idx) - 'a'.charCodeAt(0);
        //     if (strKeyArr[strKeyArrIdx] == null) strKeyArr[strKeyArrIdx] = 0;
        //     strKeyArr[strKeyArrIdx] += 1;
        // }

        [...str].forEach(chr => {
            let strKeyArrIdx = str.charCodeAt(idx) - 'a'.charCodeAt(0);
            if (strKeyArr[strKeyArrIdx] == null) strKeyArr[strKeyArrIdx] = 0;
            strKeyArr[strKeyArrIdx] += 1;
        })
        
        const key = strKeyArr.join("");
        if (strWordMap[key] == null) strWordMap[key] = [];
        strWordMap[key].push(str);
    }

    return Object.values(strWordMap);
};