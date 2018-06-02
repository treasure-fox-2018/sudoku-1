"use strict"

class Sudoku {
  constructor(board_string) {
    this.mainBoardArr = this.strtoArr(board_string);
    
  }
  
  //release 0
  strtoArr(str) {
    var mainBoard = [];
    var rowBoard = [];
    var index = 0;
    while (index <= str.length) {
      if ((index+1) % 9 === 0) {
        rowBoard.push(Number(str[index])); //penyebab utama ga jalan, lupa ngubah string jadi number..
        mainBoard.push(rowBoard);
        rowBoard = [];
      }
      else {
        rowBoard.push(Number(str[index])); //penyebab utama ga jalan, lupa ngubah string jadi number..
      }
      index++;
    }
    return mainBoard;
  } 
    
  //release 1 - horizontal check
  //pengecekan release 1, 2, dan 3 dibuat input nya sama agar dapat dilakukan secara simultan
  rowCheck (boardArr, row, column, value) {
    for (var i = 0; i <= boardArr.length - 1; i++) {
      if (i !== column && boardArr[row][i] === value) { //dia tidak cek diri sendiri
          return false;
        }
      }
    return true;
  }

  //release 2 - vertical check
  //pengecekan release 1, 2, dan 3 dibuat input nya sama agar dapat dilakukan secara simultan
  columnCheck (boardArr, row, column, value) {
    for (var i = 0; i <= boardArr.length - 1 ; i++) {
      if (i !== row && boardArr[i][column] === value) { //dia tidak cek diri sendiri
          return false;
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
    for (var k = indexRow; k < indexRow + 3; k++) { //sebelumnya ga fokus, salah nulis k = '' nya apa gitu.
      for (var l = indexColumn; l < indexColumn + 3; l++) { //sebelumnya ga fokus, salah nulis l = '' nya apa gitu.
        if (k !== row && l !== column && boardArr[k][l] === value) {
          return false;
        }
      }
    }
    return true;
  }
  
  checkSimultan(board, row, column, value) {
    if (this.rowCheck(board,row,column,value) === true && this.columnCheck(board,row,column,value) === true && this.blockSquareCheck(board,row,column,value === true) ) {
      return true;
    } else return false;
  }

  locateIndexValueZero () {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (this.mainBoardArr[i][j] === 0) {
          return [i, j];
        }
      }
    }
    return "sudokuBoardFull"
  }

  solve() {
    var zeroValue = this.locateIndexValueZero();
    var rowZeroValue = zeroValue[0];
    var columnZeroValue = zeroValue[1];

    if (zeroValue === "sudokuBoardFull") {
      return true;
    }
    for (var angka = 1; angka <= 9; angka++) { //parent number
      if (this.checkSimultan(this.mainBoardArr, rowZeroValue, columnZeroValue, angka) === true) {
        this.mainBoardArr[rowZeroValue][columnZeroValue] = angka;
        if (this.solve() === true) {
          return true;
        }
        this.mainBoardArr[rowZeroValue][columnZeroValue] = 0;
      }
    }
    return false;  
    
  }
    

  // Returns a string representing the current state of the board
  board() {
    // console.log()
    var printBoard = '';
    for (var i = 0; i <= this.mainBoardArr.length - 1; i++) {
      for (var j = 0; j <= this.mainBoardArr.length - 1; j++) {
        if (j === 2 || j === 5 || j === this.mainBoardArr.length - 1) {
          printBoard = printBoard + `${this.mainBoardArr[i][j]} | `;
        }
        else {
          printBoard = printBoard + `${this.mainBoardArr[i][j]} `;
        }
      }
      if (i === 2 || i === 5 || i === this.mainBoardArr.length - 1) {
        printBoard = printBoard + '\n' + '-----------------------' + '\n';
      }
      else {
        printBoard = printBoard + '\n';
        
      }
    }
    return printBoard
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)
// console.log(game)
// Remember: this will just fill out what it can and not "guess"
var run = game.solve()
if (run === true) {
  console.log('\nAkhirnya jalan................ \n')
} else console.log('mabuk stuck')

console.log(game.board())
