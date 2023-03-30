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
      box.className = "box";
    });
  });
};

export { BoxAlreadyChecked, resetGame };
