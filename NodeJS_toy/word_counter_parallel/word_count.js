/**
 * 
 * This is a word counter, which is to read files from ./text, then output the word counts.
 * 
 * @author jingjiejiang
 * @history Aor 21, 2022
 * 
 */
const fs = require('fs');

const tasks = [];
const wordCounts = {};
const filesDir = './text';
let comppletedTasks = 0;

const checkIfComplete = () => {

  comppletedTasks ++;
  if (comppletedTasks === tasks.length) {
    for (let idx in wordCounts) {
      console.log(`${idx}:${wordCounts[idx]}`);
    }
  }
}

const addWordCount = (word) => {
  wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
}

const countWordsInText = (text) => {
  const words = text
    .toString()
    .toLowerCase()
    .split(/\W+/)
    .sort();
    
    words
      .filter(word => word)
      .forEach(word => addWordCount(word));
}

fs.readdir(filesDir, (err, files) => { // get a list of files
  
  if (err) throw err;
  
  files.forEach(file => {
    const task = (file => {
      return () => {
        fs.readFile(file, (err, text) => {
          if (err) throw err;
          countWordsInText(text);
          checkIfComplete();
        });
      };
    })(`${filesDir}/${file}`);
    tasks.push(task);
  });
  // start execute tasks in parallel
  tasks.forEach(task => task());
});