import * as image from './image.js';
import * as audio from './audio.js';

// component
const boxSize = 32;

const snakeChar = [];
snakeChar[0] = {
  x: 9 * boxSize,
  y: 10 * boxSize,
};

const generateFood = () => ({
  x: Math.floor(Math.random() * 17 + 1) * boxSize,
  y: Math.floor(Math.random() * 15 + 3) * boxSize,
});
let foodChar = generateFood();

let keyDirection = '';
let score = 0;

const hit = (head, snakes) => {
  for (let i = 0; i < snakes.length; i++) {
    if (head.x === snakes[i].x && head.y === snakes[i].y) return true;
  }
  return false;
};

const draw = () => {
  const snake = document.getElementById('snake');
  const ctx = snake.getContext('2d');

  ctx.drawImage(image.ground, 0, 0);

  snakeChar.forEach((snake, index) => {
    ctx.fillStyle = index === 0 ? 'green' : 'white';
    ctx.fillRect(snake.x, snake.y, boxSize, boxSize);

    ctx.strokeStyle = 'red';
    ctx.strokeRect(snake.x, snake.y, boxSize, boxSize);
  });

  ctx.drawImage(image.food, foodChar.x, foodChar.y);

  let newSnakeCharX = snakeChar[0].x;
  let newSnakeCharY = snakeChar[0].y;
  if (keyDirection === 'LEFT') newSnakeCharX -= boxSize;
  else if (keyDirection === 'UP') newSnakeCharY -= boxSize;
  else if (keyDirection === 'RIGHT') newSnakeCharX += boxSize;
  else if (keyDirection === 'BOTTOM') newSnakeCharY += boxSize;

  if (newSnakeCharX === foodChar.x && newSnakeCharY === foodChar.y) {
    score++;
    foodChar = generateFood();
  } else {
    snakeChar.pop();
  }

  const snakeNewHead = {
    x: newSnakeCharX,
    y: newSnakeCharY,
  };

  if (
    hit(snakeNewHead, snakeChar) ||
    newSnakeCharX < boxSize ||
    newSnakeCharX > boxSize * 17 ||
    newSnakeCharY < boxSize * 3 ||
    newSnakeCharY > boxSize * 17
  )
    clearInterval(game);

  snakeChar.unshift(snakeNewHead);

  let highScore = localStorage.getItem('highscore') || 0;
  if (score > highScore) localStorage.setItem('highscore', score);

  ctx.fillStyle = 'white';
  ctx.font = '30px helvetica';
  ctx.fillText(score, 2 * boxSize, 1.6 * boxSize);

  ctx.fillStyle = 'white';
  ctx.font = '30px helvetica';
  ctx.fillText(highScore, 4.8 * boxSize, 1.6 * boxSize);
};

const direction = (event) => {
  if (event.keyCode === 37 && keyDirection != 'RIGHT') keyDirection = 'LEFT';
  else if (event.keyCode === 38 && keyDirection != 'BOTTOM')
    keyDirection = 'UP';
  else if (event.keyCode === 39 && keyDirection != 'LEFT')
    keyDirection = 'RIGHT';
  else if (event.keyCode === 40 && keyDirection != 'UP')
    keyDirection = 'BOTTOM';
};

const game = setInterval(draw, 100);
document.addEventListener('keydown', direction);
