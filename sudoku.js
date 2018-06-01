"use strict"

class Sudoku {
  constructor(board_string) {}

  solve() {
  }

  // Returns a string representing the current state of the board
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

  line() {
    var row = [];

    for (let i = 0; i < board_string.length; i++) {
    row.push(`${board_string[i]}`)
    }
    return row;
  }

  checkRow() {
    
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

console.log(game.board());
