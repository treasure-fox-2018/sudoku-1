// use strict'

class Sudoku {
  constructor(boardString) {
    this.board = this.board(boardString);
    this.backtrack = this.backTrack(this.board);
  //   console.log(this.backtrack);
  }

  backTrack(board) {
    let idxBacktrack = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          idxBacktrack.push([i,j]);
        }
      }
    }
    return idxBacktrack;
  }

  vertical(count,idx,board){
      var cek_v = true;
      for (let i = 0; i < 9; i++) {
        if (board[i][idx]==count) {
          cek_v = false        
        }
      }
      return cek_v
  }

  horizontal(count,idx,board){
      var cek_h = true;
      for (var j = 0; j < 9; j++) {
        if(board[idx][j]==count){
          cek_h = false;
        }
      }
      return cek_h;
  }

  area(count,idx,board){
      var cek_a = true
      var row = idx[0]
      var column = idx[1]
      let toprow = Math.floor(row / 3) * 3;
      let leftColumn = Math.floor(column / 3) * 3;
      // console.log(toprow,leftColumn);
      
      for (let i = toprow; i < toprow + 3; i++) {
        for (let j = leftColumn; j < leftColumn + 3; j++) {
          if (count === board[i][j]) {
            cek_a = false
          }
        }
      }
      return cek_a;
    }
  

  allChecks (count,idx,board) {
      var cek_all = false

      if(this.horizontal(count,idx[0],board)==true){
       if(this.vertical(count,idx[1],board)==true){
          if(this.area(count,idx,board)==true){
          cek_all = true
          }
       }
      }
      return cek_all
  }

  solve() {
    let value = 0;
    let board = this.board;
    let backtrack = this.backtrack;
    let isSolved = false;
    let i = 0;
    while (i < backtrack.length) {
      isSolved = false;
      // console.log(i);
      
      let row = backtrack[i][0];
      let column = backtrack[i][1];
      value = board[row][column];
      while (isSolved === false && value <= 9) {
        if (this.allChecks(value, [row, column], board) === true) {
          //   console.log('trueee');
          isSolved = true;
          board[row][column] = value;
        } else {
          value++;
        }
      }
      if (isSolved === false) {
        board[row][column] = 0;
        i--;
      } else {
        i++;
      }
      // console.log(board);
      
    }
  }

  // Returns a string representing the current state of the board
  board() {
      var big_board = []
      var idx = 0
      
      for (let i = 0; i < 9; i++) {
        var small_board = []
        for (let j = 0; j < 9; j++) {
          small_board.push(parseInt(boardString[idx]))
          idx++
        }
        big_board.push(small_board)
      }
      // console.log(big_board);
      return big_board
    }
  }
// The file has newlines at the end of each line,
// so we call split to remove it (\n)

var fs = require('fs');
var boardString = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split('\n')[0];

var game = new Sudoku(boardString);

// Remember: this will just fill out what it can and not "guess"

game.solve();

console.log(game.board);

