"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string=board_string
  }

  // Returns a string representing the current state of the board
  board() {
    var printBoard=[]
    var index=0
    for(let i=0; i<9; i++){
      var smallBoard=[]
      for(let j=0; j<9; j++){
          smallBoard.push(Number(this.board_string[index]))
          index++
      }
      printBoard.push(smallBoard)
    }
    return printBoard
  }

  checkPosisi(){
    var checkPosisi= this.board()
    for(let i=0; i<checkPosisi.length; i++){
      for(let j=0; j<checkPosisi[i].length; j++){
        if(checkPosisi[i][j] === 0){
          var index =[i,j]
          for(let x=1; x<=9; x++){
            var count=0
            // CHECK HORIZONTAL
            if(checkPosisi[i].indexOf(x) === -1){
              count+=1
              // LOOPING VERTICAL
              var checkValueVertical=0
              var newIndex=[i,j]
              for(let z=0; z < checkPosisi.length; z++){
                if(checkPosisi[newIndex[0]][j] !== x){
                  checkValueVertical+=1
                }
              }
              if(checkValueVertical===9){
                count+=1
              }
              //  CHECK SQUARE
              var indexSquare=[i,j]
              var checkValueSquare=0
              if(indexSquare[0] < 3 && indexSquare[1] < 3){
                for(let a=0; a < checkPosisi.length-6; a++){
                  for (let u=0; u < checkPosisi[a].length-6; u++){
                    indexSquare[0]=a
                    indexSquare[1]=u
                    if(checkPosisi[indexSquare[0]][indexSquare[1]] !== x){
                      checkValueSquare+=1
                    }
                  }
                }
                if(checkValueSquare===9){
                  count+=1
                }
              }

              else if(indexSquare[0] < 6 && indexSquare[1] < 6){
                for(let a=3; a < checkPosisi.length-3; a++){
                  for (let u=3; u<  checkPosisi[a].length-3; u++){
                    indexSquare[0]=a
                    indexSquare[1]=u
                    if(checkPosisi[indexSquare[0]][indexSquare[1]] !== x){
                      checkValueSquare+=1
                    }
                  }
                }
                if(checkValueSquare===9){
                  count+=1
                }
              }

              else if(indexSquare[0] < 9 && indexSquare[1] < 9){
                for(let a=6; a<checkPosisi.length; a++){
                  for (let u=6; u<checkPosisi[a].length; u++){
                    indexSquare[0]=a
                    indexSquare[1]=u
                    if(checkPosisi[indexSquare[0]][indexSquare[1]] !== x){
                      checkValueSquare+=1
                    }
                  }
                }
                if(checkValueSquare===9){
                  count+=1
                }
              }
            }
            if (count === 3){
              checkPosisi[i][j]=x 
            }
          }
        }
      }
    }
    return checkPosisi
  } 

  solve() {
    var result = this.checkPosisi()
    return result
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
game.board()
console.log("Before:")
console.log(game.board())
console.log("")

console.log("After:")
game.solve()
console.log(game.solve())
