const container = document.querySelector(".container");

export function generatePlayerBoard(player) {
  let board;

  if (!document.querySelector(".board.player")) {
    const title = document.createElement("h2");

    title.textContent = "Player";
    container.appendChild(title);

    board = document.createElement("div");

    board.classList.add("board");
    board.classList.add("player");
    board.setAttribute("data-player", `${player.type}`);

    container.appendChild(board);
  } else {
    board = document.querySelector(".board.player");
    board.textContent = "";
  }

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cellDiv = document.createElement("div");

      cellDiv.classList.add("cell");
      cellDiv.setAttribute("data-coordinates", `${i},${j}`);
      board.appendChild(cellDiv);

      const fleetCell = player.gameboard.fleet.get(`${i},${j}`);
      if (fleetCell) {
        cellDiv.classList.add("ship");
      }
      if (player.gameboard.board[i][j] === "X") {
        cellDiv.classList.add("hit");
      } else if (player.gameboard.board[i][j] === "@") {
        cellDiv.classList.add("hit");
        cellDiv.classList.add("ship");
      }
    }
  }
}

export function generateEnemyBoard(player) {
  let board;

  if (!document.querySelector(".board.enemy")) {
    const title = document.createElement("h2");
    title.textContent = "Enemy";
    container.appendChild(title);

    board = document.createElement("div");
    board.classList.add("board");
    board.classList.add("enemy");
    board.setAttribute("data-player", `${player.type}`);

    container.appendChild(board);
  } else {
    board = document.querySelector(".board.enemy");
    board.textContent = "";
  }

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cellDiv = document.createElement("div");

      cellDiv.classList.add("cell");
      cellDiv.setAttribute("data-coordinates", `${i},${j}`);
      board.appendChild(cellDiv);

      if (player.gameboard.board[i][j] === "X") {
        cellDiv.classList.add("hit");
      } else if (player.gameboard.board[i][j] === "@") {
        cellDiv.classList.add("hit");
        cellDiv.classList.add("ship");
      }
    }
  }
}
