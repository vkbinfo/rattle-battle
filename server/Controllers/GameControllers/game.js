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
    const eatFood = this.eatFood.bind(this);
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
      position: { x: 300, y: 300 },
      direction: 'down',
      velocity: 2,
      color: 'red',
      length: SNAKE.INITIAL_LENGTH,
    };
    const eatFood = this.eatFood.bind(this);
    const rivalBody = [];
    const intervalNumber = Number(2);
    this.secondSnake = new Snake(PlayerTwo, initialProperties, eatFood, rivalBody, intervalNumber);
    this.firstSnake.rivalBody = this.secondSnake.bodyCoordinates;
    this.secondSnake.rivalBody = this.firstSnake.bodyCoordinates;
    this.freeToJoin = false;
  }

  setIntervalNumber(number) {
    this.firstSnake.interval = number;
    this.secondSnake.interval = number;
  }

  makeFood() {
    // TODO: find place for food on the board by checking that food is not getting created on the snake board.
    const firstSnakeBody = this.firstSnake.bodyCoordinates;
    let foodInSnakebody = true;
    let x;
    let y;
    while (foodInSnakebody) {
      x = Math.round(Math.random() * 1400);
      y = Math.round(Math.random() * 700);
      // eslint-disable-next-line no-loop-func
      foodInSnakebody = firstSnakeBody.find(position => x === position.x && y === position.y);
    }
    return { x, y };
  }

  eatFood(snakeHead) {
    const { x, y } = this.food;
    if (
      (x > snakeHead.x - 12) && (x < snakeHead.x + 12) &&
      (y > snakeHead.y - 12) && (y < snakeHead.y + 12)
    ) {
      this.food = this.makeFood();
      console.log('I am getting eaten');
      return true;
    }
    return false;
  }

  moveSnakes() {
    // this.firstSnake.moveSnakeOneStep();
    this.secondSnake.moveSnakeOneStep();
    return { snakeBodies: [...this.firstSnake.bodyCoordinates, ...this.secondSnake.bodyCoordinates], food: this.food };
  }

  changeDirection(info) {
    // this.firstSnake.changeDirection(info.key);
    this.secondSnake.changeDirection(info.key);
  }
}

module.exports = {
  Game,
};
