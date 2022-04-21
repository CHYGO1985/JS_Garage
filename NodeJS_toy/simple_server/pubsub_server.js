/**
 * 
 * This is pub-sub server. The server listen on client connection, and write the message
 * to the connected client.
 * 
 * @author jingjiejiang
 * @history Apr 21, 2022
 * 
 */
const events = require('events');
const net = require('net');

const channel = new events.EventEmitter();
channel.setMaxListeners(50);
channel.clients = {};
channel.subscriptions = {};

/* listion on client join envets and followed by sub events */
channel.on('join', (id, client) => {

  const welcome = `Welcome! Guests online: ${channel.listeners('broadcast').length}`;
  client.write(`${welcome}\n`);
  channel.clients[id] = client;
  channel.subscriptions[id] = (senderId, message) => {

    // console.log(`id ${id}`);
    // console.log(`senderId ${senderId}`);
    if (id != senderId) {
      channel.clients[id].write(message);
    }
  };
  channel.on('broadcast', channel.subscriptions[id]);
});

channel.on('leave', (id) => {

  // console.log(`********${id}`);
  channel.removeListener('broadcast', channel.subscriptions[id]);
  channel.emit('broadcast', id, `${id} has left the chatroom. \n`);
});

channel.on('shutdown', () => {

  channel.emit('broadcast', '', 'The server has been shut down.\n');
  channel.removeAllListeners('broadcast');
});

const server = net.createServer(client => {

  const id = `${client.remoteAddress}:${client.remotePort}`;
  channel.emit('join', id, client);
  
  client.on('data', data => {
    data = data.toString();
    if (data == 'shutdown\r\n') {
      channel.emit('shutdown');
    }
    channel.emit('broadcast', id, data);
  });

  client.on('close', () => {
    channel.emit('leave', id);
  });
});

server.listen(8888);

