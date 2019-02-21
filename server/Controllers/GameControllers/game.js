const { Snake } = require('./snake');
const { SNAKE } = require('./constants');

class Game {
  constructor(playerOne) {
    this.roomId = (Math.random() * 100000000000).toFixed(0);
    const initialProperties = {
      position: { x: 200, y: 200 },
      direction: 'down',
      velocity: 2,
      color: 'black',
      length: SNAKE.INITIAL_LENGTH,
    };
    const eatFood = () => false;
    const rivalBody = [];
    const intervalNumber = Number(2);
    this.firstSnake = new Snake(playerOne, initialProperties, eatFood, rivalBody, intervalNumber);
    this.secondSnake = null;
    this.freeToJoin = true;
    this.food = this.makeFood();
    this.winner = null;
    this.ended = false;
  }

  joinGame(PlayerTwo) {
    const initialProperties = {
      position: { x: 600, y: 400 },
      direction: 'up',
      velocity: 2,
      color: 'red',
      length: SNAKE.INITIAL_LENGTH,
    };
    const eatFood = () => false;
    const rivalBody = [];
    const intervalNumber = Number(2);
    this.secondSnake = new Snake(PlayerTwo, initialProperties, eatFood, rivalBody, intervalNumber);
    this.freeToJoin = false;
  }

  makeFood() {
    // TODO: find place for food on the board by checking that food is not getting created on the snake board.
    const firstSnakeBody = this.firstSnake.bodyCoordinates;
    return [600, 600];
  }

  moveSnakes() {
    this.firstSnake.moveSnakeOneStep();
    return this.firstSnake.bodyCoordinates;
  }
}

const game = new Game('zarathustra');
console.log(game.moveSnakes());

// module.exports = {
//   Game,
// };
