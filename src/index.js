import "./css/styles.css";
import "./css/modern-normalize.css";
import { Game } from "./modules/gameController";
import { listenForPlacement } from "./modules/domUtils";

const game = new Game();
game.placementPhase();

listenForPlacement(game);
