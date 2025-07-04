# 🚢 Battleship Game

A simple, test-driven implementation of the classic **Battleship** game built with vanilla JavaScript and Webpack. Play against a simple algorithm that attacks your board and focuses its attacks once it hits your ships.

## Live Demo

Check out the live version of this project: [**Battleship Live Demo**](https://aleloiac.github.io/battleship/)

## How It Works

This project replicates the classic Battleship board game:

- 10x10 grid
- Each side starts with a fleet of ships (Carrier, Battleship, Destroyer, Submarine)
- The player clicks on ship samples and then on the cell where they want to place it, choosing the orientation using a button
- Ships are placed randomly on the grid for the computer player
- The player and the computer take turns selecting coordinates to attack
- A ship is sunk when all its parts are hit
- The game ends when one fleet is entirely destroyed

### Computer Player Behavior

The computer opponent uses a **simple algorithm** — it randomly selects coordinates and avoids hitting the same spot twice.
After hitting a ship, it queues all the adjacent valid cells and attacks them.

## Testing

This project uses **Jest** for unit testing, ensuring that the core game logic is robust and reliable.

### Tests cover:

- ✅ Ship creation and hit tracking
- ✅ Gameboard mechanics (placement, attacks, ship status)
- ✅ Player creation
