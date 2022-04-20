const net = require('net');

const server = net.createServer(socket => {
  debugger;
  socket.on('data', data => {
    console.log(data);
    socket.write(data);
  });
});

server.listen(8888);