"use strict";

class Sudoku {
  constructor(board_string) {
    this.string = board_string;
    this.board = [];
    this.angkaSudoku = number
  }

  gameBoard() {
    let count = 0

    for (let i = 0; i < 9; i++) {
      this.board.push([]);
      for (let j = 0; j < 9; j++) {
        this.board[i].push(this.string[count]);
        count++
      }
    }
    return this.board;
  }

  horizonCheck() {
    let board = this.gameBoard();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "0") {
          for (let k = 0; k < this.angkaSudoku.length; k++) {
            if (board[i].includes(this.angkaSudoku[k]) === false) {
              board[i][j] = this.angkaSudoku[k];
            }
          }
        }
      }
    }
    return this.board;
  }

  verticalCheck() {
    let board = this.gameBoard()
    let kolomUtama = []
    let count = 0

    for (let i = 0; i < board.length; i++) {
      var kolom = []
      for (let j = 0; j < 9; j++) {
        kolom.push(board[j][i])
      }
      kolomUtama.push(kolom)
    }
    // console.log(kolomUtama)
    

    for (let i = 0; i < kolomUtama.length; i++) {
      for (let j = 0; j < kolomUtama[i].length; j++) {
        if (kolomUtama[i][j] === '0') {
          for (let k = 0; k < this.angkaSudoku.length; k++) {
            if (kolomUtama[i].includes(this.angkaSudoku[k]) === false) {
              kolomUtama[i][j] = this.angkaSudoku[k]
            }
          }
        }
      }
    }
    return kolomUtama
  }

  boxCheck() {

  }

}

const fs = require("fs");
let board_string = fs
  .readFileSync("set-01_sample.unsolved.txt")
  .toString()
  .split("\n")[0];
let number = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

let gameSudoku = new Sudoku(board_string);
let angkaSudoku = new Sudoku(number)


console.log(gameSudoku.horizonCheck())