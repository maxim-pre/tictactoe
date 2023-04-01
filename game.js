// class which holds the game logic

class Game {
  constructor() {
    this.winConditions = [
      ["0", "1", "2"],
      ["3", "4", "5"],
      ["6", "7", "8"],
      ["0", "3", "6"],
      ["1", "4", "7"],
      ["2", "5", "8"],
      ["0", "4", "8"],
      ["2", "4", "6"],
    ];
    this.winningPositions = [
      "h-top",
      "h-middle",
      "h-bottom",
      "v-left",
      "v-middle",
      "v-right",
      "d-right",
      "d-left",
    ];
    this.player1 = [];
    this.player2 = [];
    this.turn = true;
    this.gameEnd = false;
    this.player1Score = 0;
    this.player2Score = 0;
  }

  checkWinCondition(arr, condition) {
    return condition.every((v) => arr.includes(v));
  }

  player1Wins() {
    for (let i = 0; i < this.winConditions.length; i++) {
      if (this.checkWinCondition(this.player1, this.winConditions[i])) {
        this.player1Score += 1;
        this.gameEnd = true;
        this.winningPosition = this.winningPositions[i];
        return true;
      }
    }
  }

  player2Wins() {
    for (let i = 0; i < this.winConditions.length; i++) {
      if (this.checkWinCondition(this.player2, this.winConditions[i])) {
        this.player2Score += 1;
        this.gameEnd = true;
        this.winningPosition = this.winningPositions[i];
        return true;
      }
    }
  }

  draw() {
    if (
      this.player1.length + this.player2.length === 9 &&
      this.gameEnd === false
    ) {
      this.game = true;
      return true;
    }
  }

  addPlayer1(n) {
    this.player1.push(n);
  }

  addPlayer2(n) {
    this.player2.push(n);
  }

  changeTurn() {
    this.turn = !this.turn;
  }

  reset() {
    this.player1 = [];
    this.player2 = [];
    this.turn = true;
    this.gameEnd = false;
  }
}

export { Game };
