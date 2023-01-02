import * as image from './image.js';
import * as audio from './audio.js';

// Get canvas element
const snake = document.getElementById('snake');
const ctx = snake.getContext('2d');

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

function draw() {
  ctx.drawImage(image.ground, 0, 0);
}

const game = setInterval(draw, 100);
