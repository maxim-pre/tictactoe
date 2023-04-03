const BoxAlreadyChecked = (game, boxValue) => {
  if (game.player1.includes(boxValue) || game.player2.includes(boxValue)) {
    return true;
  } else {
    return false;
  }
};

const playSound = (soundFile) => {
  document.getElementById("sound").innerHTML =
    '<embed src="' +
    soundFile +
    '" hidden="true" autostart="true" loop="false"/>';
};

const reset = (board, game) => {
  game.reset();
  let boxes = Array.from(board.children);
  boxes.forEach((box) => {
    while (box.firstChild) {
      box.removeChild(box.lastChild);
    }
  });
  boxes.forEach((box) => {
    box.classList.remove("activate-animation");
    void box.offsetWidth;
    box.classList.add("activate-animation");
    if (box.classList.contains("strike")) {
      box.parentNode.removeChild(box);
    }
  });
  playSound("./sounds/pencil_check_mark_2-105940.mp3");
};

const resetGame = (resetButton, board, game) => {
  resetButton.addEventListener("click", () => {
    reset(board, game);
  });
};

const addTokenToBox = (box, tokenClass) => {
  const token = document.createElement("li");
  token.className = tokenClass;
  box.appendChild(token);
};

const getTargetSquare = (event) => {
  if (event.target.parentNode.classList.contains("box")) {
    return event.target.parentNode;
  } else if (event.target.classList.contains("box")) {
    return event.target;
  } else {
    return event.target.firstChild;
  }
};

const drawStrike = (winClass, gameBoard) => {
  let strike = document.createElement("div");
  strike.classList.add("strike", winClass, "activate-animation");
  document.getElementById(gameBoard).appendChild(strike);
};

const updateSavedIcons = (player, game, board) => {
  document
    .querySelector(`.dropdown-content.p${player}`)
    .addEventListener("click", (e) => {
      let iconClass;
      if (e.target.classList.contains("icon")) {
        iconClass = e.target.className;
      } else {
        iconClass = e.target.querySelector(".icon").className;
      }
      game[`player${player}Token`] = iconClass;
      let prevIcon = document.querySelector(
        `.score-box.p${player} .score-icon`
      );
      prevIcon.parentNode.removeChild(prevIcon);
      let newIcon = document.createElement("li");
      newIcon.className = `${iconClass} score-icon`;
      document.querySelector(`.score-box.p${player} div`).prepend(newIcon);
      reset(board, game);
    });
};

const endRound = (game) => {
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
};

export {
  BoxAlreadyChecked,
  resetGame,
  addTokenToBox,
  getTargetSquare,
  drawStrike,
  reset,
  updateSavedIcons,
  endRound,
  playSound,
};
