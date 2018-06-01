"use strict"

class Sudoku {
  constructor(board_string) {}

  solve() {}

  // Returns a string representing the current state of the board
  board() {
      let board = [];
      let i = 0;
      for (i; i < board_string.length; i++) {
          let boardRow = [];
          for (let j = i; j < i+9; j++) {
              if (board_string[j] === '0') {
                  boardRow.push(' ');
              } else {
                  boardRow.push(board_string[j]);
              }
          }
          board.push(boardRow);
          i = i+8;
      }

      return board;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

console.log(game.board())
