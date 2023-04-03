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
    //player vs player
    if (game.mode === "pvp") {
      if (game.turn) {
        game.addPlayer1(box.getAttribute("value"));
        addTokenToBox(box, `${game.player1Token} board-token p1`);
      } else {
        game.addPlayer2(box.getAttribute("value"));
        addTokenToBox(box, `${game.player2Token} board-token p2`);
      }
      game.changeTurn();
    }
    //player vs easy computer
    if (game.mode === "easy") {
      game.addPlayer1(box.getAttribute("value"));
      addTokenToBox(box, `${game.player1Token} board-token p1`);
      let compSelection = game.EasyComputerSelection();
      game.addPlayer2(compSelection);
      let compBox = document.querySelector(`[value="${compSelection}"]`);
      addTokenToBox(compBox, `${game.player2Token} board-token p2`);
    }

    //player vs hard computer
    if (game.mode === "hard") {
      game.addPlayer1(box.getAttribute("value"));
      addTokenToBox(box, `${game.player1Token} board-token p1`);
      let compSelection = game.hardComputerSelection();
      game.addPlayer2(compSelection);
      let compBox = document.querySelector(`[value="${compSelection}"]`);
      addTokenToBox(compBox, `${game.player2Token} board-token p2`);
    }
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
      document.querySelector("#draw-score").textContent = game.draws;
    }
  }
});

// adds functionality to reset button
resetGame(resetButton, board, game);

// update the saved icons in game object and change icons displayed in scoreboard
document
  .querySelector(".dropdown-content.p1")
  .addEventListener("click", (e) => {
    let iconClass = e.target.querySelector(".icon").className;
    game.player1Token = iconClass;
    let prevIcon = document.querySelector(".score-box.p1 .score-icon");
    prevIcon.parentNode.removeChild(prevIcon);
    let newIcon = document.createElement("li");
    newIcon.className = `${iconClass} score-icon`;
    document.querySelector(".score-box.p1").prepend(newIcon);
  });

document
  .querySelector(".dropdown-content.p2")
  .addEventListener("click", (e) => {
    let iconClass = e.target.querySelector(".icon").className;
    game.player2Token = iconClass;
    let prevIcon = document.querySelector(".score-box.p2 .score-icon");
    prevIcon.parentNode.removeChild(prevIcon);
    let newIcon = document.createElement("li");
    newIcon.className = `${iconClass} score-icon`;
    document.querySelector(".score-box.p2").prepend(newIcon);
  });

document
  .querySelector(".dropdown-content.modes")
  .addEventListener("click", (e) => {
    game.EasyComputerSelection();
  });
