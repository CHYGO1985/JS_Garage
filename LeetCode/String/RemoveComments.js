/**
 * @param {string[]} source
 * @return {string[]}
 * 
 * @jingjiejiang Sep 26, 2019
 */
var removeComments = function(source) {
    
  const res = [];
  if (source == null || source.length === 0) return res;

  let curStr = '', block = false;

  for (let line of source) {
    for (let idx = 0; idx < line.length; idx ++) {
      if (!block) {
        if (idx === line.length - 1) curStr += line[idx];
        else {
          const nextTwo = line.substring(idx, idx + 2);
          if (nextTwo === '//') break;
          else if (nextTwo === '/*') {
            block = true;
            idx ++;
          }
          else curStr += line[idx];
        }
      } else { // 
        if (idx < line.length - 1 && line.substring(idx, idx + 2) === '*/') {
          block = false;
          idx ++;
        }
      }
    }

    if (curStr.length > 0 && !block) {
      res.push(curStr);
      curStr = '';
    }
  }

  return res;
};