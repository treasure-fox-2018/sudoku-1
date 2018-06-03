"use strict"

class Sudoku {
  constructor(board_string) {
    this.input = board_string;
    this.board = this.makeBoard(this.input);
    this.empty = this.getEmpty(this.board);
  }

  makeBoard(input) {
    var mainBoard = [];
    for (let i = 0; i < 9; i++) {
      var innerBoard = [];
      mainBoard.push(innerBoard);
      for (let j = 0; j < 9; j++) {
        innerBoard.push(+(input[(9 * i) + j]));
        
      }
      // console.log(innerBoard)
    }
    // console.log(mainBoard)
    return mainBoard; //nested array of unsolved board
  }


  checkHorizontalPos(board, num, row) {
    for (let i = 0; i < 9; i++) {
      if (num === board[row][i]) {
        return false;
      }
    }
    return true;
  }

  checkVerticalPos(board, num, col) {
    for (let i = 0; i < 9; i++) {
      if (num == board[i][col]) {
        return false;
      }
    }
    return true;
  }

  checkGrid(board, num, row, col) {
    var horizontal = Math.floor(row / 3) * 3;
    var vertical = Math.floor(col / 3) * 3;
    for (let i = horizontal; i < horizontal + 3; i++) {
      for (let j = vertical; j < vertical + 3; j++) {
        if (num === board[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  checkFullBoard(board, num, row, col) { //check all possibilities of filling in the empty boxes
    if (this.checkGrid(board, num, row, col) === true && 
    this.checkHorizontalPos(board, num, row) === true && 
    this.checkVerticalPos(board, num, col) === true) {
      return true;
    }
    return false;
  }

  getEmpty(board) { //index position of empty spaces on mainBoard
    var emptyBox = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          emptyBox.push([i, j]);
        }
      }
  
    }
    // console.log(emptyBox)
    return emptyBox;
  }

  solve() {
    var num = 0;
    var board = this.board;
    var empty = this.empty; //index position of empty spaces
    // console.log(empty)
    var isCompleted = false;
    var i = 0;
    while (i < empty.length) { //number of empty spaces '0'
      isCompleted = false;
      var initialRow = empty[i][0];
      // console.log(initialRow)
      var initialCol = empty[i][1];
      // console.log(initialCol)
      num = board[initialRow][initialCol];
      // debugger
      while (isCompleted === false && num <= 9) {
        if (this.checkFullBoard(board, num, initialRow, initialCol) === true) {
          isCompleted = true; //if board is full, means puzzle is completed
          board[initialRow][initialCol] = num;
        } else {
          num++;
        }
      }
      if (isCompleted === false) { //move to next emptyspot
        board[initialRow][initialCol] = 0;
        i--; 
      } else {
        i++;
      }
    }
  }



  // Returns a string representing the current state of the board
  
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
// game.board()
game.solve()


console.log(game.board);
// console.log(game.solve())
