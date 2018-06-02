"use strict"

class Sudoku {
  constructor(board_string) {
    this.str = board_string;
    this.fullBoard = this.strToArr(board_string);
  }

  strToArr (str){
    let mainArr = [];
    let rowArr = [];
    for (let i in str){
      rowArr.push(+str[i]);
      if (rowArr.length >= 9){
        mainArr.push(rowArr);
        rowArr = []
      }
    }
    return mainArr
  }

  solve() {}

  // Returns a string representing the current state of the board
  board() {
    var mainBoard = '------------';
    var allRow = '';
    var rowInBox = '';
    var mainBoardRow = 0;
    for (let i in this.fullBoard){
      for (let j in this.fullBoard[i]){
        rowInBox += this.fullBoard[i][j];
        if (allRow.length >= 8){
          allRow += rowInBox;
          rowInBox = '';
        }
        if (rowInBox.length === 3){  
          rowInBox += '|';
          allRow += rowInBox;
          rowInBox = '';
        }
      }
      mainBoard += `\n${allRow}`;
      mainBoardRow ++;
      allRow = '';
      if (mainBoardRow === 3){
        mainBoard += '\n------------'
        mainBoardRow = 0;
      }
    }

   return mainBoard
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
// console.log(game.fullBoard)
