"use strict"
const rows = 9
const cols = 9
class Sudoku {
  constructor(board_string) {
    this.string = board_string
    this.rows = 9
    this.cols = 9
  }

  checkCol(numRow, numCol) {
    // var boardSudoku = this.board()
    var number = '123456789'
    // console.log('row: '+ numRow, 'col: ' + numCol)
    // if ()
  }

  solve() {
    var sudokuBoard = this.board(rows, cols) // kalo mau manggil methode board pake this, OK!
    for (let i = 0; i < sudokuBoard.length; i++) {
      for (let j = 0; j <sudokuBoard[i].length; j++) {
        if (sudokuBoard[i][j] === '0') {
          // this.checkCol(i, j)
          sudokuBoard[i][j] = '#'
          // console.log('I: ' + i + 'J :' + j)
        }
      }
    }
    return sudokuBoard
  }

  // Returns a string representing the current state of the board
  board() {
    var mainBoard = []
    var count = 0
    for (let i = 0; i < this.rows; i++) {
      var subBoard = []
      for (let j = 0; j < this.cols; j++) {
        subBoard.push(this.string[count])
        count += 1
      }
      mainBoard.push(subBoard)
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

// console.log(game.board())
console.log(board_string);
console.log('ini board:' + '\n', game.board());
console.log('ini solve:' + '\n', game.solve());
console.log('ini solve:' + '\n', game.checkCol());



