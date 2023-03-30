import { Game } from "./game.js";
import { BoxAlreadyChecked, resetGame } from "./functions.js";

let game = new Game();
const board = document.querySelector("#game-board");
const resetButton = document.querySelector("#reset-button");

board.addEventListener("click", (e) => {
  let box = e.target;
  if (
    !BoxAlreadyChecked(game, box.getAttribute("value")) &&
    game.gameEnd === false
  ) {
    if (game.turn) {
      game.addPlayer1(box.getAttribute("value"));
      box.classList.add("crossed");
      game.changeTurn();
    } else {
      game.addPlayer2(box.getAttribute("value"));
      box.classList.add("circled");
      game.changeTurn();
    }
  }
  if (game.gameEnd === false) {
    if (game.player1Wins()) {
      document.querySelector("#player1-score").textContent = game.player1Score;
    }

    if (game.player2Wins()) {
      document.querySelector("#player2-score").textContent = game.player2Score;
    }
    if (game.draw()) {
      alert("you both lost");
    }
  }
});

// adds functionality to reset button
resetGame(resetButton, board, game);
