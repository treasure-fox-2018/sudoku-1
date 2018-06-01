"use strict"

class Sudoku {
  constructor (board_string) {
    this.string = board_string
    this.board = []
    this.number = '123456789'
  }

  gameBoard() {
    let a = 0;
    let b = 9;

    for (let i = 0; i < 9; i++) {
      this.board.push([])
      for (let j = a; j < b; j++) {
        this.board[i].push(this.string[j])
      }
      a += 9
      b += 9
    }

    return this.board
  }

  checkBaris() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j > )
    }
  }

  checkKolom() {

  }

  
}

const fs = require('fs')
let board_string = fs.readFileSync('set-01_sample.unsolved.txt').toString().split("\n")[1]

let tes = new Sudoku(board_string)
// console.log(tes.countBlank())
// console.log(tes.sumAllNumber())
console.log(tes.gameBoard())
console.log()

