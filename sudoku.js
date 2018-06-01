"use strict"

class Sudoku {
  constructor(board_string) {
    // this.board = board_string
    // this.rows = rows
    // this.cols = cols
  }
    
  solve() {

  }

  main(){
    // board()
    // checkNull(mainArr)
  }
  checkCols(row){
      var candidat = '123456789'
      var selectedRows = this.board()
      for(var i = 0; i < selectedRows[row].length; i++){
        for(var j = 0; j < candidat.length; j++){
          if(selectedRows[row][i] === '0'){
              return selectedCandidate = candidat[j]
          }
        }
      }
      // return selectedCandidate
      // console.log('ini ga ada '+kamus);
      // console.log('ini ada '+ada);
      
      
      
  }

  checkNull(){
    var mainArr = this.board()
    for(var i = 0; i < mainArr; i++){
      for(var j = 0; j < mainArr[i].length; j++){
        if(mainArr[i][j] === '0'){
          // console.log(mainArr[i]);
          var selectedCandidate = this.checkCols(i)
          mainArr[i][j] = selectedCandidate
          
        }
      }
    }
    return mainArr
    // console.log(mainArr[0]);
    
    
  }

  checkRows(){
    // for(var i = 0; i < )
  }

 candidateNum(){
  //  var candidat = '123456789'
  //  count = 0
  //  return candidat[count]
 }

  // Returns a string representing the current state of the board
  board() {
    var mainArr = []
    var childArr =[]
    var counter = 0
    for(var i = 0; i < 9; i++){
      for(var j = 0; j < 9; j++){
          childArr.push(board_string[counter])
          counter++
      }
      mainArr.push(childArr)
      childArr = []
    }
    return mainArr
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
console.log(game.checkNull())




/* 
1. buat board sudoku
2. ganti nilai 0 di board 
  2a. temukan nilai 0 diboard
  2b. siapkan kandidat angka yang akan menggantikan nilai 0
  2c. cek ke baris, kolom, dan blok
    # jika ada angka yg sama ganti kandidat name
    # jika tidak, masukan angka tsb untuk menggantikan 0
  2d. jika selalu ditemukan angka yg sama, reset semua dari awal
*/





