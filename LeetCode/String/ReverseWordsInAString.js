/**
 * @param {string} s
 * @return {string}
 * 
 * @jingjiejiang Oct 2, 2019
 */
var reverseWords = function(s) {
    
    if (s == null || s.length === 0) return s;

    let words = s.trim().split(" ");
    let head = 0, rear = words.length - 1;
    
    const swap = (leftIdx, rightIdx) => {
        const tmp = words[leftIdx];
        words[leftIdx] = words[rightIdx];
        words[rightIdx] = tmp;
    }

    while (head < rear) {
        while (head < rear && words[head] === " ") head ++;
        while (head > rear && words[rear] === " ") rear --;

        swap(head ++, rear --);
    }

    return words.join(" ").replace(/\s\s+/g, " ");
};