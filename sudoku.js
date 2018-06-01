"use strict"

class Sudoku {
  constructor(board_string) {
    this.data = board_string,
    this.boardNew = this.board(row,col)
  }

  solve() {

  }

  fullBoard(row,col){
    let papan = this.board(row,col)
    for(let i = 0; i<row; i++){

    }
  }
  
  // Returns a string representing the current state of the board
  board(row,col) {
    let arrMain = []
    let indexData = 0
    for(let i = 0; i<row; i++ ){
      let arrRow = []
      arrMain.push(arrRow)
      for(let k = 0; k<this.data.length; k++){
        if(arrRow.length < col){
          arrRow.push(this.data[indexData])
          indexData++
          }
        }
      }
      return arrMain
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

console.log(game.board(9,9).join('\n'))
// console.log(game.board())
// console.log(game.boardNew)
