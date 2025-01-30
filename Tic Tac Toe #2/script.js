const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
const resetBoardButton = document.getElementById('reset-board');
const resetAllButton = document.getElementById('reset-all');
const aiToggle = document.getElementById('ai-toggle');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let scores = { X: 0, O: 0 };
let isAgainstAI = false;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize the game
function initializeGame() {
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
  });
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
}

// Check for a win or draw
function checkResult() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return gameState[a]; // Return the winning player
    }
  }
  if (!gameState.includes('')) return 'draw'; // Draw
  return null; // No result yet
}

// Update scores
function updateScores(winner) {
  if (winner === 'X') {
    scores.X++;
    scoreX.textContent = scores.X;
  } else if (winner === 'O') {
    scores.O++;
    scoreO.textContent = scores.O;
  }
}

// Handle cell click
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (gameState[index] !== '' || checkResult()) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  const result = checkResult();
  if (result) {
    if (result === 'draw') {
      alert('It\'s a draw!');
    } else {
      alert(`Player ${result} wins!`);
      updateScores(result);
    }
    initializeGame();
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (isAgainstAI && currentPlayer === 'O') {
      makeAIMove();
    }
  }
}

// AI move (random)
function makeAIMove() {
  const emptyCells = gameState.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  if (randomIndex !== undefined) {
    gameState[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';
    cells[randomIndex].classList.add('o');

    const result = checkResult();
    if (result) {
      if (result === 'draw') {
        alert('It\'s a draw!');
      } else {
        alert(`Player ${result} wins!`);
        updateScores(result);
      }
      initializeGame();
    } else {
      currentPlayer = 'X';
    }
  }
}

// Reset the board for a new round
resetBoardButton.addEventListener('click', initializeGame);

// Reset everything
resetAllButton.addEventListener('click', () => {
  scores = { X: 0, O: 0 };
  scoreX.textContent = '0';
  scoreO.textContent = '0';
  initializeGame();
});

// Toggle AI opponent
aiToggle.addEventListener('change', () => {
  isAgainstAI = aiToggle.checked;
  initializeGame();
});

// Add event listeners to cells
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

// Initialize the game on page load
initializeGame();