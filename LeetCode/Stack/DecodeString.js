/**
 * @param {string} s
 * @return {string}
 * 
 * @jingjiejiang Sep 21, 2019
 */
var decodeString = function(s) {
    
  if (s == null || s.length === 0) return s;

  let num = 0, numStack = [], strStack = [], tmpStr = [];

  for (let idx = 0; idx < s.length; idx ++) {

    let curChr = s.charAt(idx);
    if (curChr > '0' && curChr < '9') {
      num += num * 10 + (s.charCodeAt(idx) - 48);
    } else if (curChr === '[') {
      numStack.push(num);
      strStack.push(tmpStr.join(''));
      num = 0;
      tmpStr = [];
    } else if (curChr === ']') {
      num = numStack.pop();
      let curStr = tmpStr.join('');
      // the first round data still in tmpStr, so start from 1
      for (let cnt = 1; cnt < num; cnt ++) {
        tmpStr.push(curStr);
      }
      let preStr = strStack.pop();
      preStr += tmpStr.join('');
      strStack.push(preStr);
      tmpStr = [];
    } else { // [a-z]
      tmpStr.push(curChr);
    }
  }

  return strStack.pop();
};