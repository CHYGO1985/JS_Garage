const http = require('http');
const debug = require('debug')('http');
const port = 8080;

const server = http.createServer((req, res) => {
  res.end('Hello, world.');
});

server.listen(port, () => {
  console.log('Server listening on: http://localhost:%s', port);

  debugger;

  console.log("test");
  // debug(`app listening on port 8080`);
  console.log("test2");
  console.log("test3");
});