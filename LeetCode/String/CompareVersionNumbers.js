/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 * 
 * @jingjiejiang Oct 1, 2019
 */
var compareVersion = function(version1, version2) {
    
  if ((version1 == null || version1.length === 0) && (version2 == null || version2.length === 0)) {
    return 0;
  }

  if (version1 == null || version1.length === 0) return -1;
  if (version2 == null || version2.length === 0) return 1;

  const numsVer1 = version1.split(".");
  const numsVer2 = version2.split(".");

  let idx1 = 0, idx2 = 0;

  while (idx1 < numsVer1.length || idx2 < numsVer2.length) {
    curNum1 = idx1 >= numsVer1.length ? 0 : parseInt(numsVer1[idx1 ++]);
    curNum2 = idx2 >= numsVer2.length ? 0 : parseInt(numsVer2[idx2 ++]);

    if (curNum1 > curNum2) return 1;
    else if (curNum1 < curNum2) return -1;
  }

  return 0;
};