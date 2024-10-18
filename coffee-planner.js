const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
let board = Array(9).fill(null);
let currentPlayer = 'S'; // Her turn (S)

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
let board = Array(9).fill(null);
let currentPlayer = 'S'; // Her turn (S)

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWinner(board) {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Returns 'S' or 'A' for the winner
    }
  }
  return board.includes(null) ? null : 'draw'; // Return 'draw' if no empty cells
}

function minimax(board, depth, isMaximizing) {
  let winner = checkWinner(board);
  if (winner === 'A') return 10 - depth;
  if (winner === 'S') return depth - 10;
  if (winner === 'draw') return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = 'A';
        let score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = 'S';
        let score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function bestMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = 'A';
      let score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function makeMove(index) {
  if (!board[index] && !checkWinner(board)) {
    board[index] = currentPlayer;
    updateBoard();
    if (currentPlayer === 'S') {
      currentPlayer = 'A';

      // Disable cells and date picker during computer's turn
      cells.forEach(cell => cell.style.pointerEvents = 'none');

      // Adding delay for the computer move
      setTimeout(() => {
        let move = bestMove();
        if (move !== undefined) {
          board[move] = 'A';
        }
        currentPlayer = 'S';
        updateBoard();

        let winner = checkWinner(board);
        if (winner) endGame(winner);
        
        // Re-enable cells and date picker after computer's turn
        cells.forEach(cell => cell.style.pointerEvents = 'auto');

      }, 1000); // 1-second delay before A moves

    } else {
      let winner = checkWinner(board);
      if (winner) endGame(winner);
    }
  }
}

function updateBoard() {
  cells.forEach((cell, i) => {
    cell.textContent = board[i];
  });
}

function endGame(winner) {
  if (winner === 'S') {
    message.textContent = "You won! I guess I'll leave you alone. 😅";
  } else if (winner === 'A') {
    // Add date picker for selecting the coffee date
    // Add date picker for selecting the coffee date
const datePicker = document.createElement('input');
datePicker.type = 'date';
datePicker.id = 'coffee-date';
datePicker.style.marginTop = '10px';

// Set minimum date to tomorrow
const today = new Date();
today.setDate(today.getDate() + 1);
const formattedDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
datePicker.min = formattedDate; // Set the min attribute to tomorrow's date

const button = document.createElement('button');
button.textContent = 'Send WhatsApp Message';
button.style.marginTop = '10px';

message.textContent = "I win! Let’s make it official ☕. Choose a date for coffee:";
message.appendChild(datePicker);
message.appendChild(button);

button.addEventListener('click', () => {
  const selectedDate = datePicker.value;
  if (selectedDate) {
    const formattedDate = new Date(selectedDate).toLocaleDateString();
    const whatsappMessage = encodeURIComponent(`I admit it! I couldn't win 😅. Let's go for coffee on ${formattedDate}.`);
    window.open(`https://wa.me/919910176391?text=${whatsappMessage}`, '_blank');
  } else {
    alert('Please select a date for coffee!');
  }
});

  } else {
    message.textContent = "It's a draw. Let’s play again!";
  }
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function handleClick(e) {
  const index = [...cells].indexOf(e.target);
  makeMove(index);
}

cells.forEach(cell => cell.addEventListener('click', handleClick));

resetButton.addEventListener('click', () => {
  board.fill(null);
  currentPlayer = 'S';
  updateBoard();
  message.textContent = '';
  cells.forEach(cell => cell.addEventListener('click', handleClick));
});

  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWinner(board) {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Returns 'S' or 'A' for the winner
    }
  }
  return board.includes(null) ? null : 'draw'; // Return 'draw' if no empty cells
}

function minimax(board, depth, isMaximizing) {
  let winner = checkWinner(board);
  if (winner === 'A') return 10 - depth;
  if (winner === 'S') return depth - 10;
  if (winner === 'draw') return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = 'A';
        let score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = 'S';
        let score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function bestMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = 'A';
      let score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function makeMove(index) {
  if (!board[index] && !checkWinner(board)) {
    board[index] = currentPlayer;
    updateBoard();
    if (currentPlayer === 'S') {
      currentPlayer = 'A';

      // Disable cells and date picker during computer's turn
      cells.forEach(cell => cell.style.pointerEvents = 'none');

      // Adding delay for the computer move
      setTimeout(() => {
        let move = bestMove();
        if (move !== undefined) {
          board[move] = 'A';
        }
        currentPlayer = 'S';
        updateBoard();

        let winner = checkWinner(board);
        if (winner) endGame(winner);
        
        // Re-enable cells and date picker after computer's turn
        cells.forEach(cell => cell.style.pointerEvents = 'auto');

      }, 1000); // 1-second delay before A moves

    } else {
      let winner = checkWinner(board);
      if (winner) endGame(winner);
    }
  }
}

function updateBoard() {
  cells.forEach((cell, i) => {
    cell.textContent = board[i];
  });
}

function endGame(winner) {
  if (winner === 'S') {
    message.textContent = "You won! I guess I'll leave you alone. 😅";
  } else if (winner === 'A') {
    // Add date picker for selecting the coffee date
    // Add date picker for selecting the coffee date
const datePicker = document.createElement('input');
datePicker.type = 'date';
datePicker.id = 'coffee-date';
datePicker.style.marginTop = '10px';

// Set minimum date to tomorrow
const today = new Date();
today.setDate(today.getDate() + 1);
const formattedDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
datePicker.min = formattedDate; // Set the min attribute to tomorrow's date

const button = document.createElement('button');
button.textContent = 'Send WhatsApp Message';
button.style.marginLeft = '10px';

message.textContent = "I win! Let’s make it official ☕. Choose a date for coffee:";
message.appendChild(datePicker);
message.appendChild(button);

button.addEventListener('click', () => {
  const selectedDate = datePicker.value;
  if (selectedDate) {
    const formattedDate = new Date(selectedDate).toLocaleDateString();
    const whatsappMessage = encodeURIComponent(`I admit it! I couldn't win 😅. Let's go for coffee on ${formattedDate}.`);
    window.open(`https://wa.me/919910176391?text=${whatsappMessage}`, '_blank');
  } else {
    alert('Please select a date for coffee!');
  }
});

  } else {
    message.textContent = "It's a draw. Let’s play again!";
  }
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function handleClick(e) {
  const index = [...cells].indexOf(e.target);
  makeMove(index);
}

cells.forEach(cell => cell.addEventListener('click', handleClick));

resetButton.addEventListener('click', () => {
  board.fill(null);
  currentPlayer = 'S';
  updateBoard();
  message.textContent = '';
  cells.forEach(cell => cell.addEventListener('click', handleClick));
});
