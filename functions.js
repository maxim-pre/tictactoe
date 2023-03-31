const BoxAlreadyChecked = (game, boxValue) => {
  if (game.player1.includes(boxValue) || game.player2.includes(boxValue)) {
    return true;
  } else {
    return false;
  }
};

const resetGame = (resetButton, board, game) => {
  resetButton.addEventListener("click", () => {
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
    });
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

export { BoxAlreadyChecked, resetGame, addTokenToBox, getTargetSquare };