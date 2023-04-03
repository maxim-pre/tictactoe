import { Game } from "./game.js";
import {
  BoxAlreadyChecked,
  resetGame,
  addTokenToBox,
  getTargetSquare,
  drawStrike,
  reset,
  updateSavedIcons,
  endRound,
} from "./functions.js";

//initialize game object
let game = new Game();
//save the game board object
let board = document.querySelector("#game-board");
//save the reset button
const resetButton = document.querySelector("#reset-button");

// adds functionality to reset button
resetGame(resetButton, board, game);

//adds an event listener to the dropdown menu for selecting new icons
updateSavedIcons("1", game, board);
updateSavedIcons("2", game, board);

//adds an event listener to the dropdown menu for selecting different game modes
document
  .querySelector(".dropdown-content.modes")
  .addEventListener("click", (e) => {
    game.mode = e.target.getAttribute("value");
    reset(board, game);
  });

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
    if (game.mode === "easy" && game.gameEnd == false) {
      game.addPlayer1(box.getAttribute("value"));
      addTokenToBox(box, `${game.player1Token} board-token p1`);
      endRound(game);
      if (game.gameEnd === false) {
        let compSelection = game.EasyComputerSelection();
        game.addPlayer2(compSelection);
        let compBox = document.querySelector(`[value="${compSelection}"]`);
        addTokenToBox(compBox, `${game.player2Token} board-token p2`);
      }
    }

    //player vs hard computer
    if (game.mode === "hard") {
      game.addPlayer1(box.getAttribute("value"));
      addTokenToBox(box, `${game.player1Token} board-token p1`);
      endRound(game);
      if (game.gameEnd === false) {
        let compSelection = game.hardComputerSelection();
        game.addPlayer2(compSelection);
        let compBox = document.querySelector(`[value="${compSelection}"]`);
        addTokenToBox(compBox, `${game.player2Token} board-token p2`);
      }
    }
  }

  endRound(game);
});
