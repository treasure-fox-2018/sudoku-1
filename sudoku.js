"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardArr = this.stringToArr(board_string);
  }
  //function conver given string to array 9x9 board
  //input string 
  //output array of number 9x9
  stringToArr(str) {
    let stringArr = [];
    let counter = 0;
    for (let i = 0 ; i < 9; i++) {
      if (stringArr[i] === undefined) {
        stringArr.push([]);
      }
      for (let j = 0; j < 9; j++) {
        stringArr[i].push(Number(str[counter]));
        counter++;
      }
    } 
    return stringArr;
  }

  //RELEASE-1
  //function check sudoku in horizonal line
  //return false if the value already exist in horizontal line
  //return true if the value is not exist in horizontal line
  checkHorizontal(board,row,column,value) {
    for (let i = 0 ; i < 9 ; i++) {
      if (i !== column && board[row][i] === value) { //check value in row but not it self
        return false;
      }
    }
    return true;
  }

  //RELEASE-2
  //function check sudoku in vertical line
  //return false if the value already exist in vertical line
  //return true if the value is not exist in vertical line
  checkVertical(board,row,column,value) {
    for (let i = 0 ; i < 9 ; i++) {
      if (i !== column && board[i][column] === value) { //check value in column but not it self
        return false;
      }
    }
    return true;
  }

  //RELEASE-3
  //function check sudoku inside its box
  //input array board, row, column, and a value of sudoku number
  //return false if the value already exist inside its box
  //return true if the value is not exist insie its box
  checkInBox(board,row,column,value) {
    let i = 0;
    let j = 0;
    //find top left coordinat of its box
    if (row >= 0 && row <=2 && column >=0 && column <= 2) {
      i = 0;
      j = 0;
    } else if (row >= 0 && row <=2 && column >=3 && column <= 5) {
      i = 0;
      j = 3;
    } else if (row >= 0 && row <=2 && column >=6 && column <= 8) {
      i = 0;
      j = 6;
    } else if (row >= 3 && row <=5 && column >=0 && column <= 2) {
      i = 3;
      j = 0;
    } else if (row >= 3 && row <=5 && column >=3 && column <= 5) {
      i = 3;
      j = 3;
    } else if (row >= 3 && row <=5 && column >=6 && column <= 8) {
      i = 3;
      j = 6;
    } else if (row >= 6 && row <=8 && column >=0 && column <= 2) {
      i = 6;
      j = 0;
    } else if (row >= 6 && row <=8 && column >=3 && column <= 5) {
      i = 6;
      j = 3;
    } else if (row >= 6 && row <=8 && column >=6 && column <= 8) {
      i = 6;
      j = 6;
    }
    //cek if the current index have same value in box
    for (let k = i; k < i+3; k++) {
      for (let l = j; l < j+3; l++) {
        if (k !== row && j != column && board[k][l] === value) { //check value in box but not it self
          return false;
        }
      }
    }
    return true;
  }

  //function to combine checking in all direction and inbox 3x3 check
  //return true if there is no same number , return false if same number exist
  checkInAll (board,row,column,value) {
    if (this.checkHorizontal(board,row,column,value) === true && this.checkVertical(board,row,column,value) === true && this.checkInBox(board,row,column,value === true) ) {
      return true;
    } else return false;
  }

  //function to find first empty (0) value in board, and return the empty index wity type array contian row and column, if no empty index means that game is finish 
  checkEmptyIndex () {
    for (let i = 0; i < 9; i++) {
      for (let j = 0 ; j < 9 ; j++) {
        if (this.boardArr[i][j] === 0) {
          return [i,j]
        }
      }
    }
    return "boardFull";
  }

  //function recursive for fill and check sudoku number
  //log : 23:56 PM STILL ERROR HERE RETURN FALSE ISTEAD TRUE HUHUHU,SEND PULL REQUEST
  //log : 00:32 AM FINALLYY FOUND THE BUG !!!!! FINAL COMMIT

  //I use backtrack algorithm to solve this case
  //first empty (0) index as the parent, and if we set a number (that not same as vertical/horizontal/inbox number) to it, 
  //then next empty index will be its children, and next empty index again will be its children, Do it with recursive.
  //if we set number in next empty index and the number is already exist in horizontal/vertical/inbox number, then we moved back to its parent
  //and change the parent number value to +1 and do recursive again and again and again till DIE.
  solve() {
    let emptyIndex = this.checkEmptyIndex();
    let rowIndex = emptyIndex[0];
    let columnIndex = emptyIndex[1];
    // console.log(rowIndex,columnIndex);
    if (emptyIndex === "boardFull") {
      // console.log("full didieu euy");
      return true;
    }
    for (let number = 1 ; number <= 9 ; number++ ) {
      // console.log('main for ',number)
      if (this.checkInAll(this.boardArr, rowIndex, columnIndex, number) === true) {
        // console.log("didieu",rowIndex,columnIndex,number)
        //set boardArr current index to number value
        this.boardArr[rowIndex][columnIndex] = number;
        // console.log(this.board());
        // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
        //do recursive to check next empty Index ,if the recursive return true, then stop this function by return true;
        if (this.solve() === true ) {
          return true;
        }
        //if function this.solve return false set back current index number value to 0, this is called backtrack algorithm if the target not found/false,
        //then it will back to its parent which is in this case previous set index number, and try its neighbour which is number+1;
        this.boardArr[rowIndex][columnIndex] = 0;
      }
    }
    return false;

  }

  // Returns a string representing the current state of the board
  board() {
    let printBoard = "-----------------------------";
    let printPerline = "";
    for (let i = 0 ; i < this.boardArr.length ; i++) {
      for (let j = 0 ; j < this.boardArr.length; j++) {
        if (j === 3 || j === 6) {
          printPerline += "|";
        }
        printPerline += ` ${this.boardArr[i][j]} `;
      }
      printBoard += "\n"+printPerline;
      if ( (i+1) % 3 === 0 && i !== 0) {
        printBoard += "\n"+"-----------------------------";
      }
      printPerline = "";
    }
    return printBoard;
  }

  

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs');
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]



var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
// game.solve()
console.log(game.board()) //print sudoku board 
let run = game.solve();
if (run === true ) {
  console.log("yeay game is finished and we solved the SUNGOKU game, eh SUDOKU \nBelow is the solved board")
} else console.log("Ups , we can not solved the game, please ask SODOKO, or MASAKO, or AJINOMOTO :(")
console.log(game.board()) //print again board after sudoku solved