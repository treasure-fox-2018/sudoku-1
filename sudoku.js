"use strict"

class Sudoku {

  line() {
    var row = [];

    for (let i = 0; i < board_string.length; i++) {
      row.push(+board_string[i])
    }
    return row;
  }

  arrBoard() {
    var rowArr = [];
    for (let i = 0; i < board_string.length; i+=9) {
      rowArr.push(game.line().splice(i,9))
    }
    return rowArr;
  }

  board() {
    console.log('-------------------------------');
    for (let i = 0; i < game.line().length; i+= 9) {
      console.log(`${game.line()[i]}  ${game.line()[i + 1]}  ${game.line()[i + 2]}  |  ${game.line()[i + 3]}  ${game.line()[i + 4]}  ${game.line()[i + 5]}  |  ${game.line()[i + 6]}  ${game.line()[i + 7]}  ${game.line()[i + 8]}`);
      if (i === 18) {
        console.log('-------------------------------');
      }else if (i === 45) {
        console.log('-------------------------------');
      }
    }
    console.log('-------------------------------');
    return '';
  }

  emptyCheck() {
    var emptyIndex = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (game.arrBoard()[i][j] === 0) {
          emptyIndex.push(i);
          emptyIndex.push(j);
          return emptyIndex;
        }
      }
    }
    return 'solved';
  }

  colCheck(row, col, answer){
		for(let i = 0; i < 9; i++){
			if(game.arrBoard()[row][i] === answer){
        return false;
			}
		}
    return true;
	}

  rowCheck(row, col, answer) {
    for (let i = 0; i < 9; i++) {
      if (answer === game.arrBoard()[i][col]) {
        return false;
      }
    }
    return true;
  }

  // blockCheck(row, col, answer) {
  //   for (let i = 3; i <= 9; i+=3) {
  //     for (let j = 3; j <= 9; j+=3) {
  //       if (row < i && col < j) {
  //         for (let k = i - 3; k < i; k++) {
  //           for (let l = j - 3; l < j; l++) {
  //             if (answer === game.arrBoard()[k][l]) {
  //               return false;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return true;
  // }

  blockCheck(row, col, answer) {
    if (row < 3 && col < 3) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (game.arrBoard()[i][j] === answer) {
            return false;
          }
        }
      }
    }else if (row < 3 && col < 6) {
      for (let i = 0; i < 3; i++) {
        for (let j = 3; j < 6; j++) {
          if (game.arrBoard()[i][j] === answer) {
            return false;
          }
        }
      }
    }else if (row < 3 && col < 9) {
      for (let i = 0; i < 3; i++) {
        for (let j = 6; j < 9; j++) {
          if (game.arrBoard()[i][j] === answer) {
            return false;
          }
        }
      }
    }else if (row < 6 && col < 3) {
      for (let i = 3; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
          if (game.arrBoard()[i][j] === answer) {
            return false;
          }
        }
      }
    }else if (row < 6 && col < 6) {
      for (let i = 3; i < 6; i++) {
        for (let j = 3; j < 6; j++) {
          if (game.arrBoard()[i][j] === answer) {
            return false;
          }
        }
      }
    }else if (row < 6 && col < 9) {
      for (let i = 3; i < 6; i++) {
        for (let j = 6; j < 9; j++) {
          if (game.arrBoard()[i][j] === answer) {
            return false;
          }
        }
      }
    }else if (row < 9 && col < 3) {
      for (let i = 6; i < 9; i++) {
        for (let j = 0; j < 3; j++) {
          if (game.arrBoard()[i][j] === answer) {
            return false;
          }
        }
      }
    }else if (row < 9 && col < 6) {
      for (let i = 6; i < 9; i++) {
        for (let j = 3; j < 6; j++) {
          if (game.arrBoard()[i][j] === answer) {
            return false;
          }
        }
      }
    }else if (row < 9 && col < 9) {
      for (let i = 6; i < 9; i++) {
        for (let j = 6; j < 9; j++) {
          if (game.arrBoard()[i][j] === answer) {
            return false;
          }
        }
      }
    }
    return true;
  }

  allCheck(row, col, answer) {
    if (game.colCheck(row, col, answer) === true && game.rowCheck(row, col, answer) === true && game.blockCheck(row, col, answer) === true) {
      return true;
    }
    return false;
  }

  solve() {
      
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
console.log(game.solve());
// console.log(game.allCheck(0,1,7));
// console.log(game.rowCheck(0,1,7));
// console.log(game.colCheck(0,1,7));
// console.log('block check');
// console.log(game.blockCheck(0,0,1));
// console.log(game.blockCheck(0,0,2));
// console.log(game.blockCheck(0,0,3));
// console.log(game.blockCheck(0,0,4));
// console.log(game.blockCheck(0,0,5));
// console.log(game.blockCheck(0,0,6));
// console.log(game.blockCheck(0,0,7));
// console.log(game.blockCheck(0,0,8));
// console.log(game.blockCheck(0,0,9));
// console.log('row check');
// console.log(game.rowCheck(8,8,1));
// console.log(game.rowCheck(8,8,2));
// console.log(game.rowCheck(8,8,3));
// console.log(game.rowCheck(8,8,4));
// console.log(game.rowCheck(8,8,5));
// console.log(game.rowCheck(8,8,6));
// console.log(game.rowCheck(8,8,7));
// console.log(game.rowCheck(8,8,8));
// console.log(game.rowCheck(8,8,9));
// console.log('col check');
// console.log(game.colCheck(8,8,1));
// console.log(game.colCheck(8,8,2));
// console.log(game.colCheck(8,8,3));
// console.log(game.colCheck(8,8,4));
// console.log(game.colCheck(8,8,5));
// console.log(game.colCheck(8,8,6));
// console.log(game.colCheck(8,8,7));
// console.log(game.colCheck(8,8,8));
// console.log(game.colCheck(8,8,9));
