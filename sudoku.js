"use strict"

class Sudoku {

  constructor(board_string) {
    this.angka = board_string
  }

  solve() {

    let box = this.board()

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (box[i][j] === ' ') {
            let isiAngka = []

          for (let k = 0; k < 9; k++) {
            if (box[i][k] !== ' ') {
              isiAngka.push(Number(box[i][k]))
            }
          }

          for (let l = 0; l < 9; l++) {
            if (box[l][j] !== ' ') {
              isiAngka.push(Number(box[l][j]))
            }
          }

          let cekI = 0
          let cekJ = 0
          if (i < 3) {
            cekI = 0
          } else if (i >= 3 && i < 6) {
            cekI = 3
          } else if (i >= 6) {
            cekI = 6
          }

          if (j < 3) {
            cekJ = 0
          } else if (j >= 3 && j < 6) {
            cekJ = 3
          } else if (j >= 6) {
            cekJ = 6
          }

          for (let m = koorI; m < koorI+3; m++) {
            for (let n = koorJ; n < koorJ+3; n++) {
              if (box[m][n] !== ' ') {
                isiAngka.push(Number(box[m][n]))
              }
            }
          }

          let result = this.generateAngka(isiAngka)
          box[i][j] += result
        }
      }
    }
    return box
   }

  // Returns a string representing the current state of the board
  board() {

    let angka = this.angka
    let boxArr = []
    let count = 0
    for (let i = 0; i < 9; i++) {
        let boxTmp = []
        for (let j = 0; j < 9; j++) {
            boxTmp.push(Number(angka[count]))
            count += 1
        }
        boxArr.push(boxTmp)
    }
    return boxArr
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
// game.board()

console.log(game.solve())
