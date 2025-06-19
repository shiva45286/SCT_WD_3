const board = document.getElementById("board");
const status = document.getElementById("status");
let cells = [];
let currentPlayer = "X";
let gameActive = true;

function createBoard() {
   board.innerHTML = "";
     cells = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
      cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(i));
      board.appendChild(cell);
    cells.push("");
  }
}

function handleClick(index) {
  if (!gameActive || cells[index] !== "") return;

  cells[index] = currentPlayer;
      board.children[index].textContent = currentPlayer;

  if (checkWin()) {
    status.textContent = `Player ${currentPlayer} wins!`;
          gameActive = false;
    highlightWinner(checkWin());
  } else if (!cells.includes("")) {
    status.textContent = "It's a draw!";
     gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6],            // diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
      return pattern;
    }
  }

  return null;
}

function highlightWinner(pattern) {
  pattern.forEach(index => {
    board.children[index].classList.add("winner");
  });
}

function resetGame() {
      currentPlayer = "X";
  gameActive = true;
  status.textContent = "Player X's turn";
           createBoard();
}

createBoard();
