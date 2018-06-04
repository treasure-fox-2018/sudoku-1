"use strict"

class Sudoku {
  constructor(board_string) {
    this.data = board_string;
    this.boardGame = this.board()
    this.records = []
    this.recordsOfBackTrack = []
  }

  solve() {
    let board_game = this.boardGame;
    for(let a = 0; a < board_game.length; a++ ){
      for(let b = 0; b < board_game[a].length; b++){
        let row = a
        let col = b
        let numberOnBoard = board_game[a][b]
        if(numberOnBoard == 0){
          this.fillPosibilityNum(row, col, 1)
          console.log('......................', board_game[row][col])
          if(board_game[row][col] === 0){
            console.log('--=-=-=-=-=-=',row, col)
            console.log('hoiiiii')
            console.log('dari solve __________', this.records)
            return 'stop disini  ' + ' ' + row + ', ' + col + ', numpos :' +  numberOnBoard   ;
          }
        }
        //jika masih nol maka kembali ke step berikut nya dan tambahkan nilai nya
      }
    }
    return this.boardGame
  }

  // Returns a string representing the current state of the board
  board() {
    let dBoard = [];
    let string = this.data;
    let tempArr = [];

    for(let i = 0; i < string.length; i++){
      let numToPush = Number(string[i]) 
      tempArr.push(numToPush);
      if(tempArr.length === 9){
        dBoard.push(tempArr);
        tempArr = [];
      }
    }
    //return this.boardGame
    return dBoard;    
  }

  //checking posibility number
  fillPosibilityNum(row, col, posibilityNum){
    for(let numToFill = posibilityNum; numToFill <= 9; numToFill++){
      if(this.checkPosibilityNum(row,col, numToFill)){
        //reference this.boardGame
        console.log('numToFil ---------->',numToFill)
        this.boardGame[row][col]=numToFill
        this.records.push({row: row, col:col, value: numToFill}) 
        return this.boardGame
      }
    }
    console.log('keluar dari for')
    console.log(row, col, this.boardGame[row][col])

    let lastRecord = this.records.splice(this.records.length-1, 1)
    
    console.log(this.records)
    
    return this.fillPosibilityNum(lastRecord[0].row, lastRecord[0].col, lastRecord[0].value+1)
    
    //return this.fillPosibilityNum()
    console.log('selesai fil num')
  }

  checkPosibilityNum(row, col, numToFill){
    if(this.checkHorizon(row, col, numToFill)){
      if(this.checkVertical(row, col, numToFill)){
        let rowOfBox = this.pointOfGroup(row);
        let colOfBox = this.pointOfGroup(col);
        if(this.checkBox(rowOfBox, colOfBox, numToFill)){
          console.log('to fill :  ',numToFill)
          return true;
        }
      }
    }
   return false; 
  }
  checkHorizon(row, col, number){
    let row_game = this.boardGame[row];
    for(let a = 0; a < row_game.length; a++){
      let numberOnBoard = row_game[a]
      if(numberOnBoard === number){
        return false;
      }
    }
    return true;
  }

  checkVertical(row, col, number){
   let board_game = this.boardGame
   for(let a = 0; a < board_game.length; a++ ){
     let numToCheck = board_game[a][col]
     if (numToCheck === number){
       return false;
     }
   }
   return true; 
  }

  checkBox(row, col, number){
    let board_game = this.boardGame
    for(let a = row; a < row + 3; a++){
      for(let b = col; b < col + 3; b++ ){
        let numToCheck = board_game[a][b]
        if(numToCheck === number){
          return false
        }
      }
    }
    return true
  }

  pointOfGroup(spot){
    var newSpot = 0;
    if(spot >=0 && spot <=2){ newSpot = 0 };
    if(spot >=3 && spot <=5 ){ newSpot = 3 };
    if(spot >=6 && spot <=8 ){ newSpot = 6 };
    return newSpot;
  }

  doBackTrack(){
    let tracks = this.records
    let lastIdxOnRecord = tracks.length-1
    let track = tracks[lastIdxOnRecord]
    let rowTrack = track.row
    let colTrack = track.col
    
    let prevlastIdxOnRecord = tracks.length-2
    let prevTrack = tracks[prevlastIdxOnRecord]
    let rowPrevTrack = prevTrack.row
    let colPrevTrack = prevTrack.col 
    let valuePrevTrack = prevTrack.value + 1
    console.log(track, rowTrack, colTrack)
    console.log(prevTrack, rowPrevTrack, colPrevTrack)
    this.boardGame[rowTrack][colTrack] = 0
    this.fillPosibilityNum(rowPrevTrack, colPrevTrack, valuePrevTrack)
    this.records.splice(lastIdxOnRecord, 1)
    console.log('akhir back track')
    //this.records.splice(lastIdxOnRecord, 1)
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

  // var board_string = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
  // .toString()
  // .split("\n")[0]




var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
console.log(game.solve())
console.log(game.boardGame)
console.log(game.board())
console.log(game.records)

