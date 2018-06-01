"use strict"

class Sudoku {
  constructor(board_string) {
    this.num = board_string
  }

  solve() {

   }

  // Returns a string representing the current state of the board
  board() {
    let num = this.num/
    let board = []
    let counter = 0
    for (let i = 0; i < 9; i++) {
        let tempBoard = []
        for (let j = 0; j < 9; j++) {
            tempBoard.push(Number(num[counter]))
            counter += 1
        }
        board.push(tempBoard)
    }
    return board
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

// game.solve()

console.log(game.board())
