/**
 * @param {string} s
 * @return {string}
 * 
 * @jingjiejiang Sep 29, 2019
 */
var longestPalindrome = function(s) {
  if (s == null || s.length === 0) return "";
    
  const preProcessor = () => {

    const str = new Array(s.length * 2 + 3);
    str[0] = "@";
    
    for (let idx = 1; idx < str.length - 1; idx ++) {
                
      str[idx] = (Math.floor(idx % 2) === 0) ? s.charAt(Math.floor(idx / 2) - 1) : "#";
    }

    str[str.length - 1] = "$";
      
    return str;
  }

  const newStr = preProcessor();
        
  const getPalindrome = () => {

   const palinLens = [...Array(newStr.length)].map(_ => 0);

   let center = 0, right = 0, mirOfRight = 0, startIdx = 0, maxLen = -1;

   for (let idx = 1; idx < newStr.length - 1; idx ++) {
       
     mirOfRight = 2 * center - 1;
     
     if (idx < right && mirOfRight >= 0 && mirOfRight < newStr.length) palinLens[idx] = Math.min(palinLens[mirOfRight], right - idx);

     while (idx + (1 + palinLens[idx]) < newStr.length && newStr[idx + (1 + palinLens[idx])] === newStr[idx - (1 + palinLens[idx])]) {
         palinLens[idx] ++;
     } 

     if (idx + palinLens[idx] > right) {
       center = idx;
       right = idx + palinLens[idx];
     }
       
     if (palinLens[idx] > maxLen) {
       startIdx = Math.floor((idx - palinLens[idx] + 1) / 2) - 1;
       maxLen = palinLens[idx];
     }
   }
      
   return s.substring(startIdx, startIdx + maxLen);
  }

  return getPalindrome();
};