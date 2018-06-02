"use strict"

class Sudoku {
  constructor(board_string) {
    this.sudokuBoard = this.convertString(board_string);
  }

  // buat method untuk ambil data angka sudoku di txt dan jadikan array 9x9
  convertString(){
    let layoutBoard = [];
    let size = 9;
    let newArr = [];
    for (let i = 0; i < size*size; i++) {
      newArr.push(Number(board_string[i]));
      if (newArr.length === size) {
        layoutBoard.push(newArr);
        newArr = [];
      }
    }
    return layoutBoard;
  }
  // buat method untuk board
  // Returns a string representing the current state of the board
  board() {
    let pembatas = '-----------------------------';
    let printBoard = '';
    for (let i = 0; i < this.sudokuBoard.length; i++) {
      if (i === 0 || i === 3 || i === 6) {
        printBoard += pembatas + '\n';
      }
      for (let j = 0; j < this.sudokuBoard.length; j++) {
        if (j === 2 || j === 6) {
          printBoard += ' ' + this.sudokuBoard[i][j] + ' |';
        }else {
          printBoard += ' ' + this.sudokuBoard[i][j] + ' ';
        }
      }
      printBoard += '\n';
    }
    return printBoard + pembatas;
  }

  // buat method untuk cek horizontal


  solve() {}
}



// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]
// console.log(board_string);
var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

console.log(game.board())

// buat method untuk ambil data angka sudoku di txt dan jadikan array 9x9 "LAYOUT AWAL" --> DONE
// buat method untuk board --> DONE
// buat method untuk cek horizontal
// buat method untuk cek vertical
// buat method untuk cek horizontal
// buat method untuk cek 3x3
// buat method gabungan vertical,horizontal dan 3x3
// BACKTRACK ???????????
