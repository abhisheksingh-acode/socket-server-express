const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});

io.on('connection', (socket) => {
   console.log('a user connected');

   socket.on('disconnect', () => {
     console.log('user disconnected');
   });

   socket.on('chat', ({msg, id}) => {
      console.log(`message: ${msg} from ${id}`);
      io.emit('chat', {msg, id});
    });

 });

server.listen(5000, () => {
  console.log('listening on *:3000');
});