import * as image from './image.js';
import * as audio from './audio.js';

// component
const boxSize = 32;

const snakeChar = [];
snakeChar[0] = {
  x: 9 * boxSize,
  y: 10 * boxSize,
};

const foodChar = {
  x: Math.floor(Math.random() * 17 + 1) * boxSize,
  y: Math.floor(Math.random() * 15 + 3) * boxSize,
};

let score = 0;
let highScore = localStorage.getItem('highscore') || 0;

if (score > highScore) localStorage.setItem('highscore', score);
function draw() {
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

  ctx.fillStyle = 'white';
  ctx.font = '30px helvetica';
  ctx.fillText(score, 2 * boxSize, 1.6 * boxSize);

  ctx.fillStyle = 'white';
  ctx.font = '30px helvetica';
  ctx.fillText(highScore, 4.8 * boxSize, 1.6 * boxSize);
}

const game = setInterval(draw, 100);
