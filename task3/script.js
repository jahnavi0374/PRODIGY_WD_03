const cells = document.querySelectorAll('.cell');
const turnMessage = document.getElementById('turn-message');
const restartButton = document.getElementById('restart-button');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const closeModalButton = document.getElementById('close-modal-button');
const gameBoard = document.getElementById('game-board'); // Reference to game board container

let currentPlayer = 'X';
let gameActive = true;
let moves = 0;

// Function to handle cell click
function handleCellClick() {
  if (!gameActive) return;

  if (this.textContent !== '') return;

  this.textContent = currentPlayer;
  moves++;

  if (checkWin(currentPlayer)) {
    endGame(`Player ${currentPlayer} wins!`);
    return;
  } else if (moves === 9) {
    endGame('It\'s a draw!');
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  turnMessage.textContent = `Player ${currentPlayer}'s turn`;
}

// Function to check for a win
function checkWin(player) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === player;
    });
  });
}

// Function to end the game
function endGame(message) {
  showModal(message);
  gameActive = false;
  gameBoard.classList.add('game-over'); // Add a class to game board container
}

// Function to show modal with message
function showModal(message) {
  modalMessage.textContent = message;
  modal.style.display = 'block';
}

// Function to close modal
function closeModal() {
  modal.style.display = 'none';
}

// Function to restart the game
function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  moves = 0;
  turnMessage.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('win');
  });
  gameBoard.classList.remove('game-over'); // Remove game board border class
  closeModal();
}

// Event listeners
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
closeModalButton.addEventListener('click', closeModal);
