"use strict"

// first init -> game.board()
//NOTED: angka 0 adalah kosong / empty
// buat pengecekan nomor perbaris - new method
// buat pengecekan nomor perkolom - new method
// buat pengecekan per 3 x 3
// solving -> game.solve()

class Sudoku {
  constructor(board_string) {
    this.isiBoard = board_string;
  }

  cekBaris(no, boards, row) {
    for (let i = 0; i < 9; i++) {
      if (boards[row][i] === no) {
        return false
      }
    }
    return true
  }

  cekKolom(no, boards, col) {
    for (let i = 0; i < 9; i++) {
      if (boards[i][col] === no) {
        return false
      }
    }
    return true
  }


  checkBox(boards, no, row, col) {
    let gridRow = Math.floor(row / 3) * 3;
    let gridCol = Math.floor(col / 3) * 3;
    for (let i = gridRow; i < gridRow + 3; i++) {
      for (let j = gridCol; j < gridCol + 3; j++) {
        if (no === boards[i][j]) {
          return false;
        }
      }
    }
    return true;
  }
  // all checker result collected here
  collectCheck(boards, no, row, col) {
    return this.checkBox(boards, no, row, col) && this.cekBaris(no, boards, row) && this.cekKolom(no, boards, col)
  }


  solve() {
    let board = this.board()
    let empty = []
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] == 0) {
          empty.push([i, j])
        }
      }

    }

    let status = false
    let i = 0
    while (i < empty.length) {
      status = false
      let I = empty[i][0]
      let J = empty[i][1]
      let numInput = board[I][J]
      while (!status && numInput <= 9) {
        if (this.collectCheck(board, numInput, I, J)) {
          status = true
          board[I][J] = numInput
        } else {
          numInput++
        }
      }
      if (status == false) {
        board[I][J] = 0
        i--
      } else {
        i++
      }
    }
    return this.showBoards(board)
  }


  showBoards(board) {
    let display3 = "";
    for (let i = 0; i < board.length; i++) {
      if (i % 3 === 0) {
        display3 += ("_________________" + "\n");
      }
      for (let j = 0; j < board[i].length; j++) {
        if (j % 3 === 0 && j != 0) {
          display3 += " | ";
        }
        display3 += (board[i][j]);
      }
      display3 += "\n";
      if (i === board.length - 1) {
        display3 += ("__________________");
      }
    }
    return display3
  }



  board() {
    var board1 = [];
    var board2 = [];
    var no = 0;
    for (let i = 1; i <= 9; i++) {
      board1 = [];
      for (let j = 1; j <= 9; j++) {
        board1.push(Number(this.isiBoard[no]));
        no++
      }
      board2.push(board1);
    }
    return board2;
  }
}


// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string);
console.log('\n BEFORE: ')
console.log(game.board())
// Remember: this will just fill out what it can and not "guess"

console.log('\n AFTER: ')
console.log(game.solve())
console.log('\n ')
