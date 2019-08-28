/**
 * @param {number[][]} buildings
 * @return {number[][]}
 * 
 * @jingjiejiang Aug 28, 2019
 */
var getSkyline = function(buildings) {
    
  if (!buildings) return [];

  const heights = [];

  for (let building of buildings) {
    heights.push([building[0], - building[2]]);
    heights.push([building[1], building[2]]);
  }

  heights.sort((a, b) => {return a[0] === b[0]? a[1] - b[1] : a[0] - b[0]});
    
  const curHeights = {};
  const res = [];
  let curHeight, preHeight = -1;

  for (let height of heights) {

    if (height[1] < 0) {
      if (!curHeights[-height[1]]) curHeights[-height[1]] = 0;
      curHeights[-height[1]] += 1;
    } else {
      curHeights[height[1]] -= 1;
      if (curHeights[height[1]] === 0) delete curHeights[height[1]];
    }

    const keys = Object.keys(curHeights);
      
    curHeight = keys.length === 0? 0 :  keys[keys.length - 1];

    if (curHeight != preHeight) {
      res.push([height[0], curHeight]);
      preHeight = curHeight;
    }
  }

  return res;
};