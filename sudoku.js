"use strict"

class Sudoku {
  constructor(boardString) {
    this.str = boardString;
    this.fullBoard = this.numArr(boardString);
    this.emptyPositions = this.emptyPositions(this.fullBoard);
  }

  numArr (str){
    let mainArr = [];
    let rowArr = [];
    for (let i in str){
      rowArr.push(+str[i]);
      if (rowArr.length >= 9){
        mainArr.push(rowArr);
        rowArr = []
      }
    }
    return mainArr
  }

  emptyPositions (fullBoard){
    var emptyPositions = [];
    for (let i in fullBoard){
      for (let j in fullBoard[i]){
        if (fullBoard[i][j] === 0){
          emptyPositions.push([+i, +j]);
        }
      }
    }
    return emptyPositions;
  }

  checkRow (fullBoard, row, num){
    for (let i in fullBoard[row]){
      if (fullBoard[row][i] === num){
        return false;
      }
    }
    return true;
  }

  checkCol (fullBoard, col, num){
    for (let i in fullBoard){
      if (fullBoard[i][col] === num){
        return false;
      }
    }
    return true;
  }

  checkBox (fullBoard, row, col, num){
    // nentuin titik2 batasan kotak
    var colPojok = 0;
    var rowPojok = 0;
    var boxSize = 3;

    // bikin titik2 batasan yg baru
    while (row >= rowPojok + boxSize){
      rowPojok += boxSize;
    }
    while (col >= colPojok + boxSize){
      colPojok += boxSize;
    }

    for (let i = rowPojok; i < rowPojok + boxSize; i++){
      for (let j = colPojok; j < colPojok + boxSize; j++){
        if(fullBoard[i][j] === num){
          return false;
        }
      }
    }
    return true;
  }

  checkAll (fullBoard, row, col, num){
    if (this.checkRow(fullBoard, row, num) && 
    this.checkCol(fullBoard, col, num) && 
    this.checkBox(fullBoard, row, col, num)){
      return true;
    }
    else {
      return false;
    }
  }

  solve() {
    var limit = 9;

    for(let i = 0; i < this.emptyPositions.length;){
      let row = this.emptyPositions[i][0];
      let col = this.emptyPositions[i][1];
      let isFound = false;
      // increment num2 yg mungkin dapat jadi solusi
      let num = this.fullBoard[row][col] + 1;
      // coba num sampe num mencapai limit (9) atau solusi dianggap ketemu (found)
      while(isFound === false && num <= limit){
        // kalo num dites cocok, anggap solusi ketemu(found), assign nilainya, lanjut next ke kotak kosong selanjutnya
        if(this.checkAll(this.fullBoard, row, col, num)){
          isFound = true;
          this.fullBoard[row][col] = num;
          i++;
        }
        // kalo ngga, coba num berikutnya
        else {
          num++;
        }
      }
      // kalo num2 dalam limit yg ditentuin (9) gbs jd solusi, kosongin lg nilai di kotak saat ini, dan balik ke kotak kosong sebelumnya; krn berarti num yg sebelumnya diassign blm jd solusi yg tepat
      if (isFound === false){
        this.fullBoard[row][col] = 0;
        i--;
      }
    }
    return this.board(this.fullBoard);
  }

  // Returns a string representing the current state of the board
  board(fullBoard) {
    var mainBoard = '------------';
    var allRow = '';
    var rowInBox = '';
    var mainBoardRow = 0;
    for (let i in fullBoard){
      for (let j in fullBoard[i]){
        rowInBox += fullBoard[i][j];
        if (allRow.length >= 8){
          allRow += rowInBox;
          rowInBox = '';
        }
        if (rowInBox.length === 3){  
          rowInBox += '|';
          allRow += rowInBox;
          rowInBox = '';
        }
      }
      mainBoard += `\n${allRow}`;
      mainBoardRow ++;
      allRow = '';
      if (mainBoardRow === 3){
        mainBoard += '\n------------'
        mainBoardRow = 0;
      }
    }
   return mainBoard
  }
}


// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var boardString = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(boardString)

// Remember: this will just fill out what it can and not "guess"
console.log(game.solve())

// console.log(game.fullboard)

