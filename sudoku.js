"use strict"
class Sudoku {
  constructor(board_string) {
    this.string = board_string
    this.rows = 9
    this.cols = 9
  }

  checkRows() {
    var selectedRow = game.board()[0]
    var angkaUnik = selectedRow.slice(0)
    var selectionRow = []
    var number = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    var state = true
    for (let i = 0; i < angkaUnik.length; i++) {
      if (angkaUnik[i] !== '0') {
        selectionRow.push(angkaUnik[i])
      } else if (angkaUnik[i] === '0'){
        while (state) {
          for (let j = 0; j < number.length; j++) {
            var index = angkaUnik.indexOf(number[j])
            if (index === -1) {
              state = false
              selectionRow.push(number[j])
            }
          }
        }
      }
    }
    console.log('number', number)
    console.log('angkaU', angkaUnik)
    console.log('select', selectionRow)
  }

  solve() {
    // var sudokuBoard = this.board(this.rows, this.cols) // kalo mau manggil methode board pake this, OK!
    // for (let i = 0; i < sudokuBoard.length; i++) {
    //   for (let j = 0; j <sudokuBoard[i].length; j++) {
    //     this.check(i, j)
    //     }
    //   }
    // }
    // return sudokuBoard
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
// console.log('ini solve:' + '\n', game.solve());
console.log('ini check: ' + '\n', game.checkRows());



