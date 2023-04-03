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
    this.draws = 0;
    this.player1Token = "fa-regular fa-x";
    this.player2Token = "fa-regular fa-circle";
    this.mode = "hard";
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

  checkWinner(arr) {
    for (let i = 0; i < this.winConditions.length; i++) {
      if (this.checkWinCondition(arr, this.winConditions[i])) {
        return true;
      }
    }
  }

  draw() {
    if (
      this.player1.length + this.player2.length === 9 &&
      this.gameEnd === false
    ) {
      this.draws += 1;
      this.gameEnd = true;
      return true;
    }
  }

  addPlayer1(n) {
    this.player1.push(n);
  }

  addPlayer2(n) {
    this.player2.push(n);
  }

  EasyComputerSelection() {
    let unavaliable = this.player1.concat(this.player2);
    let avaliable = ["0", "1", "2", "3", "4", "5", "6", "7", "8"].filter(
      (n) => {
        return !unavaliable.includes(n);
      }
    );
    return avaliable[Math.floor(Math.random() * (avaliable.length - 1))];
  }

  minimax(p1, p2, depth, isMax) {
    if (this.checkWinner(p2)) return 10;
    if (this.checkWinner(p1)) return -10;
    if (p1.length + p2.length === 9) return 0;
    let unavaliable = p1.concat(p2);
    let avaliable = ["0", "1", "2", "3", "4", "5", "6", "7", "8"].filter(
      (n) => {
        return !unavaliable.includes(n);
      }
    );

    if (isMax) {
      let best = -Infinity;
      avaliable.forEach((n) => {
        p2.push(n);
        best = Math.max(best, this.minimax(p1, p2, depth + 1, !isMax));
        p2.pop();
      });
      return best;
    } else {
      let best = 1000;
      avaliable.forEach((n) => {
        p1.push(n);
        best = Math.min(best, this.minimax(p1, p2, depth + 1, !isMax));
        p1.pop();
      });
      return best;
    }
  }

  hardComputerSelection() {
    let p2 = this.player2;
    let p1 = this.player1;
    let bestVal = -1000;
    let bestMove;
    let unavaliable = p1.concat(p2);
    let avaliable = ["0", "1", "2", "3", "4", "5", "6", "7", "8"].filter(
      (n) => {
        return !unavaliable.includes(n);
      }
    );
    avaliable.forEach((n) => {
      p2.push(n);
      let moveVal = this.minimax(p1, p2, 0, false);
      p2.pop();
      if (moveVal > bestVal) {
        bestMove = n;
        bestVal = moveVal;
      }
    });
    return bestMove;
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
