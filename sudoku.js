"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = new function() {
      board_string = board_string.match(/(.{1,9})/g);
      for(let i = 0; i < board_string.length; i++) {
        board_string[i] = board_string[i].split('');
      }
      return board_string;
    }
  }

  checkHorizontal(row, col) {
    let value = this.board_string[row][col];
    for(let i = 0; i < 9; i++) {
      if(i != col && this.board_string[row][i] == value) {
        return false;
      }
    }
    return true;
  }

  checkVertikal(row, col) {
    let value = this.board_string[row][col];
    for(let i = 0; i < 9; i++) {
      if(i != row && this.board_string[i][col] == value) {
        return false;
      }
    }
    return true;
  }

  checkKotak(row, col) {
    let value = Number(this.board_string[row][col]);
    let down = null;
    let left = null;
    
    if(col >= 6) {
      left = 6;
    } else if(col >= 3) {
      left = 3;
    } else {
      left = 0;
    }

    if(row >= 6) {
      down = 6;
    } else if(row >= 3) {
      down = 3;
    } else {
      down = 0;
    }
    
    for(let i = down; i < down+3; i++) {
      for(let j = left; j < left+3; j++) {
        if(!(i == row && j == col) && (Number(this.board_string[i][j]) == value)) {
          return false;
        }
      }
    }
    return true;
  }

  emptySudoku() {
    let empty = [];
    let objSolver;
    for(let i = 0; i < this.board_string.length; i++) {
      for(let j = 0; j < this.board_string[i].length; j++) {
        objSolver = {};
        if(this.board_string[i][j] == 0) {
          let cekKotak = this.checkKotak(i, j);
          objSolver = {
            index: [i, j]
          };
          empty.push(objSolver);
        }
      }
    }
    return empty;
  }

  solve() {
    let empty = this.emptySudoku();
    let row, col;
    let checker;

    for(let i = 0; i < empty.length; i++) {
      row = empty[i].index[0];
      col = empty[i].index[1];
      let check = Number(this.board_string[row][col]);
      checker = false;
      while(check!=9) {
        check++;
        this.board_string[row][col] = check;
        if(this.checkVertikal(row, col) && this.checkHorizontal(row, col) && this.checkKotak(row, col)) {
          checker = true;
          break;
        }
      }
      if(!checker) {
        this.board_string[row][col] = 0;
        if(i === 0) {
          i-=1;
        } else {
          i-=2;
        }
      }
    }
  }

  // Returns a string representing the current state of the board
  board() {
    let showBoard = "";
    for(let i = 0; i < this.board_string.length; i++) {
      if(i % 3 === 0 && i != 0) {
        showBoard +=(`----------- \n`);
      }
      for(let j = 0; j < this.board_string[i].length; j++) {
        if(j % 3 === 0 && j != 0) {
          showBoard += "|";
        }
        showBoard += (this.board_string[i][j]);
      }
      showBoard += "\n";
      
    }
    return (showBoard);
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs');
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0];

var game = new Sudoku(board_string);

// Remember: this will just fill out what it can and not "guess"
game.solve();

console.log(`${game.board()}`);