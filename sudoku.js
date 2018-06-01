"use strict"

class Sudoku {

  constructor(board_string) {
    var blok = 'ABCDEFGHI'

    for (let i = 0; i < blok.length; i++) {
      this[blok[i]] = {
        available : [],
        possibility : [],
        coordinate : []
      }
    }

  }

  solve() {
    var board = this.board()

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] !== '.') {
          if (i < 3) {
            if (j < 3) {
              this.A.available.push(board[i][j])
              this.A.coordinate.push(`${i}${j}`)
              // this.A.push([i,j])
            }
            if (j > 2 && j < 6) {
              this.B.available.push(board[i][j])
              this.B.coordinate.push(`${i}${j}`)
              // this.B.push([i,j])
            }
            if (j > 5) {
              this.C.available.push(board[i][j])
              this.C.coordinate.push(`${i}${j}`)
              // this.C.push([i,j])
            }
          }
          if (i > 2 && i < 6) {
            if (j < 3) {
              this.D.available.push(board[i][j])
              this.D.coordinate.push(`${i}${j}`)
              // this.D.push([i,j])
            }
            if (j > 2 && j < 6) {
              this.E.available.push(board[i][j])
              this.E.coordinate.push(`${i}${j}`)
              // this.E.push([i,j])
            }
            if (j > 5) {
              this.F.available.push(board[i][j])
              this.F.coordinate.push(`${i}${j}`)
              // this.F.push([i,j])
            }
          }
          if (i > 5) {
            if (j < 3) {
              this.G.available.push(board[i][j])
              this.G.coordinate.push(`${i}${j}`)
              // this.G.push([i,j])
            }
            if (j > 2 && j < 6) {
              this.H.available.push(board[i][j])
              this.H.coordinate.push(`${i}${j}`)
              // this.H.push([i,j])
            }
            if (j > 5) {
              this.I.available.push(board[i][j])
              this.I.coordinate.push(`${i}${j}`)
              // this.I.push([i,j])
            }
          }
        }else{
          if (i < 3) {
            if (j < 3) {
              // this.A.available.push(board[i][j])
              this.A.coordinate.push(`${i}${j}`)
              // this.A.push([i,j])
            }
            if (j > 2 && j < 6) {
              // this.B.available.push(board[i][j])
              this.B.coordinate.push(`${i}${j}`)
              // this.B.push([i,j])
            }
            if (j > 5) {
              // this.C.available.push(board[i][j])
              this.C.coordinate.push(`${i}${j}`)
              // this.C.push([i,j])
            }
          }
          if (i > 2 && i < 6) {
            if (j < 3) {
              // this.D.available.push(board[i][j])
              this.D.coordinate.push(`${i}${j}`)
              // this.D.push([i,j])
            }
            if (j > 2 && j < 6) {
              // this.E.available.push(board[i][j])
              this.E.coordinate.push(`${i}${j}`)
              // this.E.push([i,j])
            }
            if (j > 5) {
              // this.F.available.push(board[i][j])
              this.F.coordinate.push(`${i}${j}`)
              // this.F.push([i,j])
            }
          }
          if (i > 5) {
            if (j < 3) {
              // this.G.available.push(board[i][j])
              this.G.coordinate.push(`${i}${j}`)
              // this.G.push([i,j])
            }
            if (j > 2 && j < 6) {
              // this.H.available.push(board[i][j])
              this.H.coordinate.push(`${i}${j}`)
              // this.H.push([i,j])
            }
            if (j > 5) {
              // this.I.available.push(board[i][j])
              this.I.coordinate.push(`${i}${j}`)
              // this.I.push([i,j])
            }
          }

          
        }  

      }
    }

    for (const x in this) {
      for (let i = 1; i < 10; i++) {
        if (!this[x].available.includes(`${i}`)) {
          this[x].possibility.push(`${i}`)
        }
      }
    }

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] == '.') {
          var arrHor = []
          for (let k = 0; k < board[i].length; k++) {
            if (board[i][k] !== '.') {
              arrHor.push(board[i][k])
            }
          }

          var arrVer = []
          for (let k = 0; k < board[i].length; k++) {
            if (board[k][j] !== '.') {
              arrVer.push(board[k][j])
            }
          }

          for (const x in this) {
            if (this[x].coordinate.includes(`${i}${j}`)) {
              var result = ''
              for (let i = 0; i < this[x].possibility.length; i++) {
                if (!arrHor.includes(this[x].possibility[i]) && !arrVer.includes(this[x].possibility[i])) {
                  result += this[x].possibility[i]
                }
              }


            }
          }
          board[i][j] = result 

        }
      }
    }
    console.log(board);
      
  }

  // Returns a string representing the current state of the board
  board() {
    var board = []
    var count = 0
    for (let i = 0; i < 9; i++) {
      var row = []
      for (let j = 0; j < 9; j++) {
        if (board_string[count] == 0) {
          row.push('.')
        }else{
          row.push(board_string[count])
        }
        count++
      }
      board.push(row)
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
game.solve()
console.log('\n');
console.log(game.board())