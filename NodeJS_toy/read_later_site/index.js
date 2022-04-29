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
const Article = require('./db').Article;
const read = require('node-readability');
const { traceDeprecation } = require('process');
// const util = require("util");

const app = express();
const articles = [{ title: 'Example' }];

app.set('port', process.env.PORT || 3000);
// supprt request bodies codede as JSON
app.use(bodyParser.json());
// support form-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  '/css/bootstrap.css',
  express.static('node_modules/bootstrap/dist/css/bootstrap.css')
);

/* Front page */
app.get('/', (req, res) => {
  res.send('Hello World!');
});

/* Get all articles */
app.get('/articles', (req, res, next) => {
  Article.all((err, articles) => {
    if (err) return next(err);

    res.format({
      html: () => {
        res.render('articles.ejs', { articles });
      },
      json: () => {
        res.send(articles);
      }
    });
  })
});

/* Creates an article */
app.post('/article', (req, res, next) => {
  const url = req.body.url;

  read(url, (err, result) => {
    if (err || !result) {
      res.status(500).send('Error downloading article');
    }

    // console.log(util.inspect(result, {showHidden: false, depth: 2}));

    Article.create(
      { title: result.title, content: result.content },
      (err, article) => {
        if (err) return next(err);
        res.send('OK');
      }
    );
  });
});

app.get("/articles/:id", (req, res, next) => {
  const id = req.params.id;
  Article.find(id, (err, article) => {
    if (err) return next(err);

    res.format({
      html: () => {
        res.render('article.ejs', { article });
      },
      json: () => {
        res.send(article);
      }
    });
  });
});

app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  Article.delete(id, (err) => {
    if (err) return next(err);
    res.send({ message: 'Deleted' });
  });
});

app.listen(app.get('port'), () => {
  console.log(`Express web app available at localhost: ${app.get('port')}`);
});

module.exports = app;

