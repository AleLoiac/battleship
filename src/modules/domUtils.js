const container = document.querySelector(".container");

export function generateBoard(player) {
  const board = document.createElement("div");
  board.classList.add("board");
  board.setAttribute("data", `"player": ${player.type}`);

  container.appendChild(board);

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cellDiv = document.createElement("div");

      cellDiv.classList.add("cell");
      cellDiv.setAttribute("data", `"coordinates": ${i},${j}`);
      board.appendChild(cellDiv);

      const fleetCell = player.gameboard.fleet.get(`${i},${j}`);
      if (fleetCell) {
        cellDiv.classList.add("ship");
      }
    }
  }
}
