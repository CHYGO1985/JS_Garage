/**
 * 
 * The index.js of site.
 * 
 * @author jingjiejiang
 * @history Apr 22, 2022
 * 
 */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const articles = [{ title: 'Example' }];

app.set('port', process.env.PORT || 3000);
// supprt request bodies codede as JSON
app.use(bodyParser.json());
// support form-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

/* Front page */
app.get('/', (req, res) => {
  res.send('Hello World!');
});

/* Get all articles */
app.get('/articles', (req, res, next) => {
  res.send(articles);
});

/* Creates an article */
app.post('/article', (req, res, next) => {
  const article = { title: req.body.title };
  articles.push(article);
  res.send(article);
});

app.get("/articles/:id", (req, res, next) => {
  const id = req.params.id;
  console.log('Fetching: ', id);
  res.send(articles[id]);
});

app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('Deleting: ', id);
  delete articles[id];
  res.send({message: 'Deleted'});
});

app.listen(app.get('port'), () => {
  console.log(`Express web app available at localhost: ${app.get('port')}`);
});
  

