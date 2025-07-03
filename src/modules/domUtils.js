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

function renderAttack(e, game) {
  const target = e.target;

  if (target.classList.contains("hit")) {
    return console.log("Cell already hit");
  }

  if (
    target.parentNode.classList.contains("enemy") &&
    target.classList.contains("cell")
  ) {
    const coordinates = target.dataset.coordinates;
    game.registerAttack(coordinates[0], coordinates[2]);
  }
}

export function listenForAttacks(game) {
  const enemyBoard = document.querySelector(".enemy.board");

  enemyBoard.addEventListener("click", (e) => {
    renderAttack(e, game);
  });
}

export function declareWinner(playerType) {
  const newContainer = container.cloneNode(true);
  container.replaceWith(newContainer);

  const winTitle = document.createElement("h1");

  if (playerType === "human") {
    winTitle.textContent = "You Win!";
    newContainer.appendChild(winTitle);
  } else {
    winTitle.textContent = "Computer Wins!";
    newContainer.appendChild(winTitle);
  }
}

const submarine = document.querySelector(".submarine");
const destroyer = document.querySelector(".destroyer");
const battleship = document.querySelector(".battleship");
const carrier = document.querySelector(".carrier");

export function renderSampleShips() {
  for (let i = 0; i < 1; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    submarine.appendChild(cell);
  }
  for (let i = 0; i < 2; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    destroyer.appendChild(cell);
  }
  for (let i = 0; i < 3; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    battleship.appendChild(cell);
  }
  for (let i = 0; i < 4; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    carrier.appendChild(cell);
  }
}

export function listenForPlacement(game) {
  const playerBoard = document.querySelector(".player");
  const body = document.querySelector("body");
  const shipButtons = document.querySelectorAll(".ship-button");

  let selector = null;
  listenForOrientation();

  shipButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();

      const alreadySelected = button.classList.contains("selected");

      shipButtons.forEach((btn) => btn.classList.remove("selected"));

      if (!alreadySelected) {
        button.classList.add("selected");
        selector = button.dataset.ship;
      } else {
        selector = null;
      }
    });
  });

  body.addEventListener("click", () => {
    selector = null;
    shipButtons.forEach((btn) => btn.classList.remove("selected"));
  });

  playerBoard.addEventListener("click", (e) => {
    e.stopPropagation();
    const orientationBtn = document.querySelector(".orientation");
    const orientation = orientationBtn.dataset.orientation;

    if (selector) {
      renderPlacedShip(e, game, selector, orientation);
    }

    selector = null;
    shipButtons.forEach((btn) => btn.classList.remove("selected"));
  });
}

function renderPlacedShip(e, game, selector, orientation) {
  const target = e.target;

  const coordinates = target.dataset.coordinates;
  const y = parseInt(coordinates[0]);
  const x = parseInt(coordinates[2]);

  const result = game.registerPlacement(selector, y, x, orientation);

  if (result) console.log(result);
}

export function createStartBtn(game) {
  const startBtn = document.createElement("button");
  startBtn.textContent = "Start Game";
  startBtn.classList.add("start");
  container.appendChild(startBtn);

  listenForStart(game);
}

function listenForStart(game) {
  const startBtn = document.querySelector(".start");

  startBtn.addEventListener("click", () => {
    const startBtn = document.querySelector("button");
    const sidebar = document.querySelector(".sidebar");
    sidebar.remove();
    startBtn.remove();

    game.startGame();
    listenForAttacks(game);
  });
}

function listenForOrientation() {
  const orientationBtn = document.querySelector(".orientation");

  orientationBtn.addEventListener("click", () => {
    orientationBtn.textContent =
      orientationBtn.textContent.trim() === "Horizontal"
        ? "Vertical"
        : "Horizontal";

    orientationBtn.dataset.orientation =
      orientationBtn.dataset.orientation === "horizontal"
        ? "vertical"
        : "horizontal";
  });
}
