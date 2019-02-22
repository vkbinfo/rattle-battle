const express = require('express');


const socketIo = require('socket.io');
const { Game } = require('./Controllers/GameControllers/game');

const PORT = process.env.PORT || 4000;

const app = express();

app.get('/ping', (req, res) => {
  res.json({ status: 'working' });
});

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Listening on port ${PORT}`);
});

const io = socketIo(server);
io.sockets.on('connection', (socket) => {
  socket.on('send_direction', () => {
    const game = new Game('zarathustra');
    // socket.emit('stepChange', game.firstSnake.bodyCoordinates);
    const interval  = setInterval(() => {
       socket.emit('stepChange', game.moveSnakes())}
       , 30);
    game.setIntervalNumber(interval);
  socket.on('keyPress', game.changeDirection.bind(game))
  });
});
module.exports = server;
