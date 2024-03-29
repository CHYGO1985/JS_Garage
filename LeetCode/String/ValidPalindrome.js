// JavaScript source code

/*
 * 
 * @jingjiejiang May 24, 2019
 * 
 * another way is to use Array.unshift
 */ 
var isPalindrome = function (s) {

    let head = 0;
    let rear = s.length - 1;
    let regex = /[a-z0-9]/i;

    while (head <= rear) {
        if (!regex.test(s[head])) {
            head++;
        } else if (!regex.test(s[rear])) {
            rear--;
        } else if (s[head++].toLowerCase() !== s[rear--].toLowerCase()) {
            return false;
        }
    }

    return true;
};