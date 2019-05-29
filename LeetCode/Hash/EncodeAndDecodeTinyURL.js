/**
 * Encodes a URL to a shortened URL.
 *
 * @param {string} longUrl
 * @return {string}
 * 
 * @jingjiejiang May 29, 2019
 */

const maxChars = 6;
const seed = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const prefix = "http://tinyurl.com/";

let urlToKey = new Map();
let keyToUrl = new Map();

var encode = function(longUrl) {
    
    if (urlToKey.has(longUrl)) return urlToKey.get();

    let key = "";
    do {
        key = prefix + [...Array(maxChars)]
            .map(_ => Math.floor(Math.random() * seed.length))
            .map(i => seed[i])
            .join("");
    }
    while (keyToUrl.has(key));

    urlToKey.set(longUrl, key);
    keyToUrl.set(key, longUrl);

    return key;
};

/**
 * Decodes a shortened URL to its original URL.
 *
 * @param {string} shortUrl
 * @return {string}
 */
var decode = function(shortUrl) {

    return  (keyToUrl.has(shortUrl) === false) ? "" : keyToUrl.get(shortUrl);
};

/**
 * Your functions will be called as such:
 * decode(encode(url));
 */