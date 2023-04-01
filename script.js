import { Game } from "./game.js";
import {
  BoxAlreadyChecked,
  resetGame,
  addTokenToBox,
  getTargetSquare,
  drawStrike,
} from "./functions.js";

let game = new Game();
let board = document.querySelector("#game-board");
const resetButton = document.querySelector("#reset-button");

board.addEventListener("click", (e) => {
  let box = getTargetSquare(e);

  if (
    !BoxAlreadyChecked(game, box.getAttribute("value")) &&
    game.gameEnd === false
  ) {
    if (game.turn) {
      game.addPlayer1(box.getAttribute("value"));
      addTokenToBox(box, "fa-regular fa-x");
    } else {
      game.addPlayer2(box.getAttribute("value"));
      addTokenToBox(box, "fa-regular fa-circle");
    }
    game.changeTurn();
  }
  if (game.gameEnd === false) {
    if (game.player1Wins()) {
      document.querySelector("#player1-score").textContent = game.player1Score;
      drawStrike(game.winningPosition, "game-board");
    }

    if (game.player2Wins()) {
      document.querySelector("#player2-score").textContent = game.player2Score;
      drawStrike(game.winningPosition, "game-board");
    }
    if (game.draw()) {
      console.log("you both lost");
    }
  }
});

// adds functionality to reset button
resetGame(resetButton, board, game);
