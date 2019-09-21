/**
 * @param {number[]} arr
 * @return {number}
 * 
 * @jingjiejiang Sep 17, 2019
 */
var decodeString = function(s) {
  if (s == null || s.length === 0) return s;

  let num = 0, numStack = [], strStack = [], tmpStr = '';

  for (let idx = 0; idx < s.length; idx ++) {

    let curChr = s.charAt(idx);
    if (curChr >= '0' && curChr <= '9') {
      num = num * 10 + (s.charCodeAt(idx) - 48);
    } else if (curChr === '[') {
      numStack.push(num);
      num = 0;
      strStack.push(tmpStr);
        console.log(strStack)
      tmpStr = '';
    } else if (curChr === ']') {
      // the first round data still in tmpStr, so start from 1
      let times = numStack.pop();
      let repeat = tmpStr;
      for (let cnt = 1; cnt < times; cnt ++) {
        tmpStr += repeat;
      }
        
      tmpStr = (strStack.length > 0? strStack.pop() : '') + tmpStr;
    } else { // [a-z]
      tmpStr += curChr;
    }
  }

  return strStack.length > 0? strStack.pop() : tmpStr;
};