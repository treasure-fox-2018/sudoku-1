"use strict"

class Sudoku {
  constructor (board_string) {
    this.string = board_string
    // this.board = []
    this.angkaSudoku = ['1', '2', '3', '4', '5', '7', '8', '9']
    this.dummyBoard = []
  }

  gameBoard() {
    let indexA = 0
    let indexB = 9
    let board = []

    for (let i = 0; i < 9; i++) {
      board.push([])
      for (let j = indexA; j < indexB; j++) {
        board[i].push(this.string[j])
      }
      indexA += 9
      indexB += 9
    }


    // this.checkSudoku()
    return board
  }

  checkSudoku() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        
        if (board[i][j] === 0) {
          let vertical = this.verticalCheck(j)
          let horizontal = this.horizontalCheck(i)
        }

      }
    }
    
  }

  verticalCheck(y) {
    let numArr = []

    for (let i = 0; i < this.angkaSudoku.length; i++) {
      let count = 0
      for (let j = 0; j < 9; j++) {
        if (this.angkaSudoku[i] === this.board[i][y]) {
          count++
        }
      }
      if (count === 0) {
        numArr.push(this.angkaSudoku[i])
      }
    }
    return numArr
  }

  horizontalCheck(x) {
    let numArr = []

    for (let i = 0; i < this.angkaSudoku.length; i++) {
      let count = 0
      for (let j = 0; j < 9; j++) {
        if (this.angkaSudoku[i] === this.board[x][j]) {
          count++
        }
      }
      if (count === 0) {
        numArr.push(this.angkaSudoku[i])
      }
    }
    return numArr
  }

  check3x3() {

  }
}

const fs = require('fs')
let board_string = fs.readFileSync('set-01_sample.unsolved.txt').toString().split('\n')[0];

let gameSudoku = new Sudoku (board_string)

console.log(gameSudoku.checkSudoku())


/*
check horizontal
[0][0]
[1][0]
[2][0]

check vertical
[0][0]
[0][1]
[0][2]
*/