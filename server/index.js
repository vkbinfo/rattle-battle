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
let game = null;
let interval = null;
io.sockets.on('connection', (socket) => {
  socket.on('joinGame', () => {
    if (game === null) {
      game = new Game(0);
      socket.emit('assignPlayerId', 0);
      console.log('player 0 roomId', game.roomId);
      socket.join(game.roomId);
      socket.on('keyPress', game.changeDirection.bind(game));
    } else {
      game.joinGame(1);
      socket.emit('assignPlayerId', 1);
      console.log('player one roomId', game.roomId);
      socket.join(game.roomId);
      socket.on('keyPress', game.changeDirection.bind(game));
      interval = setInterval(() => {
        io.in(game.roomId).emit('stepChange', game.moveSnakes());
      }, 60);
      game.setIntervalNumber(interval);
    }
  });
  socket.on('newGame', () => {
    game = null;
    clearInterval(interval);
    interval = null;
  });
});

module.exports = server;
