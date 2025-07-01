const container = document.querySelector(".container");

export function generatePlayerBoard(player) {
  const title = document.createElement("h2");
  title.textContent = "Player";
  container.appendChild(title);

  const board = document.createElement("div");
  board.classList.add("board");
  board.classList.add("player");
  board.setAttribute("data-player", `${player.type}`);

  container.appendChild(board);

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
    }
  }
}

export function generateEnemyBoard(player) {
  const title = document.createElement("h2");
  title.textContent = "Enemy";
  container.appendChild(title);

  const board = document.createElement("div");
  board.classList.add("board");
  board.classList.add("enemy");
  board.setAttribute("data-player", `${player.type}`);

  container.appendChild(board);

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cellDiv = document.createElement("div");

      cellDiv.classList.add("cell");
      cellDiv.setAttribute("data-coordinates", `${i},${j}`);
      board.appendChild(cellDiv);
    }
  }
}
