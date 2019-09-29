/**
 * @param {string} path
 * @return {string}
 * 
 * @jingjiejiang Sep 28, 2019 
 */
var simplifyPath = function(path) {
   
  if (path == null || path.length === 0) return "";

  const newPathElems = [];
  const oldPathElems = path.split("/");

  for (let pathElem of oldPathElems) {
    if (newPathElems.length > 0 && pathElem === "..") {
      newPathElems.pop();
    } else if (pathElem !== "." && pathElem !== ".." && pathElem !== "") {
      newPathElems.push(pathElem);
    }
  }

  return "/" + newPathElems.join("/");
};