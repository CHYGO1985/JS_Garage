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

   let center = 0, right = 0, mirOfRight = 0, maxStart = 0, maxLen = -1;

   for (let idx = 1; idx < newStr.length - 1; idx ++) {
       
     mirOfRight = 2 * center - idx;
     
     if (idx < right && mirOfRight >= 0 && mirOfRight < newStr.length) palinLens[idx] = Math.min(palinLens[mirOfRight], right - idx);

     while (idx + (1 + palinLens[idx]) < newStr.length && newStr[idx + (1 + palinLens[idx])] === newStr[idx - (1 + palinLens[idx])]) {
         palinLens[idx] ++;
     } 

     if (idx + palinLens[idx] > right) {
       center = idx;
       right = idx + palinLens[idx];
     }
       
     if (palinLens[idx] > maxLen) {
       maxStart = Math.floor((idx - palinLens[idx] + 1) / 2) - 1;
       maxLen = palinLens[idx];
     }
   }
      
   return s.substring(maxStart, maxStart + maxLen);
  }

  return getPalindrome();
};

/* dp */
// var longestPalindrome = function(s) {
    
//   if (s == null || s.length === 0) return "";

//   const matcher = [...Array(s.length)].fill(0).map(_ => new Array(s.length).fill(0));
//   let left = 0, maxLen = 1;

//   for (let rightIdx = 0; rightIdx < s.length; rightIdx ++) {
//     matcher[rightIdx][rightIdx] = 1;
//     for (let leftIdx = 0; leftIdx < rightIdx; leftIdx ++ ) {
//      matcher[leftIdx][rightIdx] = (s.charAt(leftIdx) === s.charAt(rightIdx) && 
//       (rightIdx - leftIdx < 2 || matcher[leftIdx + 1][rightIdx - 1]));
        
//       if (matcher[leftIdx][rightIdx] && rightIdx - leftIdx + 1 > maxLen) {
//         maxLen = rightIdx - leftIdx + 1;
//         left = leftIdx;
//       }
//     }
//   }
  
//   return s.substring(left, left + maxLen);
// };

var longestPalindrome = function(s) {

  if (s == null || s.length === 0) return "";

  const newStr = "@#" + s.split("").join("#") + "#$";
  let center = 0, right = 0, mirOfRight = 0, maxStart = 0, maxLen = -1;
  const palinLens = [...Array(newStr.length)].fill(0);

  for (let idx = 1; idx < newStr.length; idx ++) {
    
    mirOfRight = 2 * center - idx;

    if (mirOfRight >= 0 && mirOfRight < s.length && idx < right) {
      palinLens[idx] = Math.min(palinLens[mirOfRight], right - idx);
    }

    let nextRightPos = idx + (1 + palinLens[idx]);
    while (nextRightPos < newStr.length &&
      newStr[idx + (1 + palinLens[idx])] === newStr[idx - (1 + palinLens(idx))]) {
        palinLens[idx] ++;
    }
    
    if (idx + palinLens[idx] > right) {
      center = idx;
      right = idx + palinLens[idx];
    }

    if (palinLens[idx] > maxLen) {
      maxLen = palinLens[idx];
      // idx - palinLens[idx] + 1 is to find the left idx in new str
      // then conver to idx in s, => x / 2 -1
      maxStart = Math.floor((idx - palinLens[idx] + 1) / 2) - 1; 
    }
  }

  return s.substring(maxStart, maxStart + maxLen);
}