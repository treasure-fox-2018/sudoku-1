"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardArr = this.stringToArr(board_string);
  }

  stringToArr(str) {
    let stringArr = [];
    let counter = 0;
    for (let i = 0 ; i < 9; i++) {
      if (stringArr[i] === undefined) {
        stringArr.push([]);
      }
      for (let j = 0; j < 9; j++) {
        stringArr[i].push(str[counter]);
        counter++;
      }
    } 
    return stringArr;
  }

  solve() {}

  // Returns a string representing the current state of the board
  board() {
    let printBoard = "-----------------------------";
    let printPerline = "";
    for (let i = 0 ; i < this.boardArr.length ; i++) {
      for (let j = 0 ; j < this.boardArr.length; j++) {
        if (j === 3 || j === 6) {
          printPerline += "|";
        }
        printPerline += ` ${this.boardArr[i][j]} `;
      }
      printBoard += "\n"+printPerline;
      if ( i % 2 === 0 && i !== 0) {
        printBoard += "\n"+"-----------------------------";
      }
      printPerline = "";
    }
    return printBoard;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs');
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]
var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

console.log(game.board())
