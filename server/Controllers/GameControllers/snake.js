const { SNAKE } = require('./constants');

class Snake {
  /**
   * @param  {string} playerId
   * @param  {Object} initialProperties initial values for snake body and motion.
   * @param  {Function} eatFood Function to check that snake's next movement will be eating food.
   * @param  {Array} rivalBody Rival snake's body coordinates
   * @param  {number} intervalNumber
   */
  constructor(playerId, initialProperties, eatFood, rivalBody, intervalNumber) {
    this.ownerId = playerId;
    this.head = { x: initialProperties.position.x, y: initialProperties.position.y };
    this.direction = initialProperties.direction;
    this.velocity = initialProperties.velocity;
    this.color = initialProperties.color;
    this.length = initialProperties.length;
    this.eatFood = eatFood;
    this.rivalBody = rivalBody;
    this.interval = intervalNumber; // interval variable, if snake collides we will clear this interval
    this.life = SNAKE.LIFE;
    this.lost = false;
    this.xAxisVelocity = 0; // the x axis movement of snake in each interval
    this.yAxisVelocity = 0; // the y axis movement of snake in each interval
    this.bodyCoordinates = [];
    this.createInitialSnakeBody(); // populate initial body of snake according to given length.
  }

  /**
   * This function generates snake body coordinates from the given starting head coordinates
   */
  createInitialSnakeBody() {
    switch (this.direction) {
      case 'down': {
        this.yAxisVelocity = this.velocity;
        break;
      }
      case 'up': {
        this.yAxisVelocity = -this.veloctiy;
        break;
      }
      case 'left': {
        this.xAxisVelocity = -this.velocity;
        break;
      }
      case 'right': {
        this.xAxisVelocity = this.velocity;
        break;
      }
      default: {
        break;
      }
    }
    // populating the snake body coordinates of snake
    for (let x = 0; x < this.length; x += 1) {
      this.head.x += this.xAxisVelocity; 
      this.head.y += this.yAxisVelocity;
      this.pushCoordinates();
    }
  }

  /**
   * Moves the snakes one steps according to relative change on x axis or y axis.
   */
  moveSnakeOneStep() {
    this.head.x += this.xAxisVelocity; // snake head's new x coordinate
    this.head.y += this.yAxisVelocity; // snake head's new y coordinate
    if (this.eatFood(this.head)) {
      this.pushCoordinates();
      this.length += SNAKE.FOOD_lENGTH_REWARD;
      for (let x = 0; x < SNAKE.FOOD_lENGTH_REWARD; x += 1) {
        this.head.x += this.xAxisVelocity; // snake head's new x coordinate
        this.head.y += this.yAxisVelocity;
        this.pushCoordinates();
      }
      this.life += SNAKE.FOOD_LIFE_REWARD; // increasing the life by 5 second on eating food.
    } else if (this.hasCollidedWithItself()
      || this.hasCollidedWithRival()) {
      this.lost = true;
      clearInterval(this.interval);
      // @TODO: emit a game mechanics event for game lost.
    } else {
      this.pushCoordinates();
    }
  }

  /**
   * Pushing new coordinates on snake movement to bodyCoordinates array of snake
   */
  pushCoordinates() {
    this.bodyCoordinates.push({
      x: this.head.x,
      y: this.head.y,
    });
    this.snakeLengthControl();
  }

  /**
   * strips etc length from snake's body that is more than current length of snake
   */
  snakeLengthControl() {
    if (this.bodyCoordinates.length > this.length) {
      this.bodyCoordinates.shift();
    }
  }

  /**
   * Checks collision of the head with it's body
   */
  hasCollidedWithItself() {
    // @TODO: implement the collision logic with itself.
    if (this.bodyCoordinates.length > this.length - 1) {
      const {x, y} = this.head;
      let collided = this.bodyCoordinates.slice(0, this.length - 8).find((collisionPoint, index) => {
        if (
          (x > collisionPoint.x - 10) && (x < collisionPoint.x + 10) &&
          (y > collisionPoint.y - 10) && (y < collisionPoint.y + 10)
        ) {
          return true;
        }
        return false;
      })
      if (collided) {
        console.log('collided', collided);
        console.log('Collided with itself');
        return true;
      }

    }
    return false;
  }

  hasCollidedWithRival() {
    // @TODO: implement the collision logic with rival snake.
    return false;
  }

changeDirection(key) {
    switch (key) {
      case 'ArrowLeft': {
        if (this.direction === 'left' || this.direction === 'right') {
          break;
        }
        if (this.previousDirection === 'right' && this.previousDirection !== 'left') {
          this.moveSnakeOneStep();
          this.moveSnakeOneStep();
          this.moveSnakeOneStep();
          this.moveSnakeOneStep();
          this.moveSnakeOneStep();// we are doing this check so snack does not collpase in itself;
        }
        this.yAxisVelocity = 0;
        this.xAxisVelocity = -2;
        this.previousDirection = this.direction;
        this.direction = 'left';
        break;
      }
      case "ArrowRight": {
        if (this.direction === 'left' || this.direction === 'right') {
          break;
        }
        if (this.previousDirection === 'left' && this.previousDirection !== 'right') {
          this.moveSnakeOneStep();
          this.moveSnakeOneStep();
          this.moveSnakeOneStep();
          this.moveSnakeOneStep();
          this.moveSnakeOneStep(); // we are doing this check so snack does not collpase in itself;
        }
        this.yAxisVelocity = 0;
        this.xAxisVelocity = +2;
        this.previousDirection = this.direction;
        this.direction = 'right';
        break;
      }
      case "ArrowUp": {
        if (this.direction === 'up' || this.direction === 'down') {
          break;
        }
        if (this.previousDirection === 'down') {
          this.moveSnakeOneStep();
          this.moveSnakeOneStep();
          this.moveSnakeOneStep();
          this.moveSnakeOneStep();
          this.moveSnakeOneStep(); // we are doing this check so snack does not collpase in itself;
        }
        this.xAxisVelocity = 0;
        this.yAxisVelocity = -2;
        this.previousDirection = this.direction;
        this.direction = 'up';
        break;
      }
      case "ArrowDown": {
        if (this.direction === 'up' || this.direction === 'down') {
          break;
        }
        if (this.previousDirection === 'up') {
          this.moveSnakeOneStep();
          this.moveSnakeOneStep();
          this.moveSnakeOneStep();
          this.moveSnakeOneStep();
          this.moveSnakeOneStep();// we are doing this check so snack does not collpase in itself;
        }
        this.xAxisVelocity = 0;
        this.yAxisVelocity = +2;
        this.previousDirection = this.direction;
        this.direction = 'down';
        break;
      }
    }
  }
}

module.exports = {
  Snake,
};
