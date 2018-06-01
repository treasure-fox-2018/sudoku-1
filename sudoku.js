"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardArr = this.generateBoard(board_string);
    this.zeroCoord = this.getZeros(this.boardArr);
  }

  generateBoard(string) {
    let board = [];
    let index = 0;
    for (let i = 0; i < 9; i++) {
      board.push([]);
      for (let j = 0; j < 9; j++) {
        board[i].push(+string[index]);
        index++;
      }
    }
    return board;
  }

  getZeros(board) {
    let coordinates = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) coordinates.push([i,j]);
      }
    }
    return coordinates;
  }

  checkNumber(board, number, row, col) {
    if (
      this.checkHorizontal(board, number, row) &&
      this.checkVertical(board, number, col) &&
      this.checkBox(board, number, row, col)
    ) {
      return true;
    }
    return false;
  }

  checkHorizontal(board, number, row) {
    for (let i = 0; i < 9; i++) {
      if (number === board[row][i]) return false;
    }
    return true;
  }

  checkVertical(board, number, col) {
    for (let i = 0; i < 9; i++) {
      if (number === board[i][col]) return false;
    }
    return true;
  }

  checkBox(board, number, row, col) {
    let baseRow = Math.floor(row / 3) * 3;
    let baseCol = Math.floor(col / 3) * 3;

    for (let i = baseRow; i < baseRow + 3; i++) {
      for (let j = baseCol; j < baseCol + 3; j++) {
        if (number === board[i][j]) return false;
      }
    }
    return true;
  }

  solve() {
    let board = this.boardArr;
    let zeroCoord = this.zeroCoord;
    let number = 0;
    let isSolved = false;
  }

  // Returns a string representing the current state of the board
  board() {
    let output = this.boardArr;
    return output;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)
console.log(game)

// Remember: this will just fill out what it can and not "guess"
// game.solve()

// console.log(game.board())
