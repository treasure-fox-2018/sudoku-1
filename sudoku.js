"use strict"

class Sudoku {
  constructor(board_string) {
    this.number = board_string
  }


  solve(){
    let board = this.board()
    let zero = this.isZero()
    // console.log(zero)
    var status = false
    let i =0
    while(i < zero.length){
      var rowI = zero[i][0]
      var colJ = zero[i][1]
      var value = board[rowI][colJ]
      status = false
      while(!status && value <=9){
        if(this.checkAll(board,rowI,colJ,value)){
          status = true
          board[rowI][colJ] = value
          // this.sleep(10)
          // this.reset_board()
        }else{
          value++
        }
      }
      if(status == false){
        board[rowI][colJ] = 0
        i--
      }else{
        i++
      }
    }
  
     
      // console.log(rowI)
      // let value = board[rowI][colJ]
      // console.log(value)
        // if(board[rowI][colJ] == 0){
        //   for(let j =1;j<=9;j++){
        //     if(this.checkAll(board,rowI,colJ,j)){
        //       board[rowI][colJ] = j
        //     }
        //   }
        // }
      


    return board
  }

  isZero(){
    let temptZero = []
    let board = this.board()
    for(let i=0;i<board.length;i++){
      for(let j =0;j<board[i].length;j++){
        if(board[i][j] == 0){
          temptZero.push([i,j])
        }
      }
     
    }
    return temptZero
  }
  
  checkBox(board,row,col,number){
    let rowPost = Math.floor(row /3) * 3
    let colPost = Math.floor(col /3) * 3
    let match = true
    for(let i=rowPost;i<rowPost + 3;i++){
      for(let j =colPost;j<colPost + 3;j++){
        if(board[i][j] == number){
          match = false
        }
      }
    }
    return match
  }

  checkHorizontal(board,row,number){
    let match = true
    for(let i=0;i<9;i++){
      if(board[row][i] == number){
        match = false
      }
    }
    return match
  }

  checkVertical(board,col,number){
    let match = true
    for(let i=0;i<9;i++){
      if(board[i][col] == number){
        match = false
      }
    }
    return match
  }

  checkAll(board,row,col,number){
    let horizontal = this.checkHorizontal(board,row,number)
    let vertical =  this.checkVertical(board,col,number)
    let box = this.checkBox(board,row,col,number)
    if(horizontal && vertical && box){
      return true
    }
    return false
  }

  board() {
    let arrBoard=[]
    let index = 0
    for(let i=0;i<9;i++){
      let tempt = []
      for(let j=0;j<9;j++){
        tempt.push(Number(board_string[index]))
        index++
      }
      arrBoard.push(tempt)
    }
    return arrBoard
  }


  sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  reset_board() {
    console.log("\x1B[2J")
  }


}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[10]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
// game.solve()
// console.log(game.board())
//  
// console.log(game.isZero())
console.log(game.solve())

