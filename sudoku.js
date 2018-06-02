"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardArr = this.strtoArr(board_string);
    
  }
  
  //release 0
  strtoArr(str) {
    var mainBoard = [];
    var rowBoard = [];
    var index = 0;
    while (index <= str.length) {
      if ((index+1) % 9 === 0) {
        rowBoard.push(str[index]);
        mainBoard.push(rowBoard);
        rowBoard = [];
      }
      else {
        rowBoard.push(str[index]);
      }
      index++;
    }
    return mainBoard;
  } 
    
  //release 1 - horizontal check
  //pengecekan release 1, 2, dan 3 dibuat input nya sama agar dapat dilakukan secara simultan
  rowCheck (boardArr, row, column, value) {
    for (var i = 0; i <= boardArr.length - 1; i++) {
      if (i !== column) {
        if (boardArr[row][i] === value) {
          return false;
        }
      }
    }
    return true;
  }

  //release 2 - vertical check
  //pengecekan release 1, 2, dan 3 dibuat input nya sama agar dapat dilakukan secara simultan
  columnCheck (boardArr, row, column, value) {
    for (var i = 0; i <= boardArr.length - 1; i++) {
      if (i !== row) {
        if (boardArr[i][column] === value) {
          return false;
        }
      }
    }
    return true;
  }
  
  // release - 3
  //check-in grup 3x3
  //pengecekan release 1, 2, dan 3 dibuat input nya sama agar dapat dilakukan secara simultan
  //awalnya ingin dibuat menjadi square 3 x 3 akan tetapi, akan mengubah cara baca pengecekannya sehingga dibuat batasan per masing2 block saja
  blockSquareCheck (boardArr, row, column, value) {
    // var grupBoard = [];

    // for (var i = 0; i <= board.length - 1; i = i+ 3) {
    //   var perGrupBoard = [['','',''],['','',''],['','','']];
    //   for (var j = 0; j <= board[i].length - 1; j = j+3) {
    //     perGrupBoard[0][0] = board[i][j];
    //     perGrupBoard[0][1] = board[i][j+1];
    //     perGrupBoard[0][2] = board[i][j+2];
    //     perGrupBoard[1][0] = board[i+1][j];
    //     perGrupBoard[1][1] = board[i+1][j+1];
    //     perGrupBoard[1][2] = board[i+1][j+2];
    //     perGrupBoard[2][0] = board[i+2][j];
    //     perGrupBoard[2][1] = board[i+2][j+1];
    //     perGrupBoard[2][2] = board[i+2][j+2];
    //     grupBoard.push(perGrupBoard);
    //     perGrupBoard = [['','',''],['','',''],['','','']];
    //     }
    //   }
    //   return grupBoard
    var indexRow = 0;
    var indexColumn = 0;

    if (row >= 0 && row <=2 && column >= 0 && column <= 2) {
      indexRow = 0;
      indexColumn = 0;
    }
    else if (row >= 0 && row <=2 && column >= 3 && column <= 5) {
      indexRow = 0;
      indexColumn = 3;
    }
    else if (row >= 0 && row <=2 && column >= 6 && column <= 8) {
      indexRow = 0;
      indexColumn = 6;
    }
    else if (row >= 3 && row <= 5 && column >= 0 && column <= 2) {
      indexRow = 3;
      indexColumn = 0;
    }
    else if (row >= 3 && row <=5 && column >= 3 && column <= 5) {
      indexRow = 3;
      indexColumn = 3;
    }
    else if (row >= 3 && row <=5 && column >= 6 && column <= 8) {
      indexRow = 3;
      indexColumn = 6;
    }
    else if (row >= 6 && row <= 8 && column >= 0 && column <= 2) {
      indexRow = 6;
      indexColumn = 0;
    }
    else if (row >= 6 && row <= 8 && column >= 3 && column <= 5) {
      indexRow = 6;
      indexColumn = 3;
    }
    else if (row >= 6 && row <= 8 && column >= 6 && column <= 8) {
      indexRow = 6;
      indexColumn = 6;
    }
    for (var k = row; k < indexRow + 3; k++) {
      for (var l = column; l < indexColumn + 3; l++) {
        if (k !== row && l !== column && boardArr[k][l] === value) {
          return false;
        }
      }
    }
    return true;
  }
  
  checkSimultan(boardArr, row, column, value) {
    if (this.rowCheck(boardArr, row, column, value) === true && this.columnCheck(boardArr, row, column, value) === true && this.blockSquareCheck(boardArr, row, column, value) === true) {
      return true;
    }
    return false;
  }

  solve() {
  
  }
    

  // Returns a string representing the current state of the board
  board() {}
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
console.log(game.solve())

console.log(game.board())
