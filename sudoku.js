"use strict"

class Sudoku {
    constructor(board_string) {
        this.strInput = board_string;
        this.lengInput = board_string.length;
    }

    solve() {
        let numbers = ['1','2','3','4','5','6','7','8','9'];

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === ' ') {
                    for (let k = 0; k < numbers.length; k++) {
                        if (board[i].includes(numbers[k]) === false) {
                            board[i][j] = numbers[k];
                        }
                    }
                }
            }
         }

        return board;
    }

    checkColumn(board, row, col, num) {

    }

    checkRow(board, row, col, num) {

    }

    // checkBox(board, pos, col) { }

    // Returns a string representing the current state of the board
    board() {
        let i = 0;
        for (i; i < this.lengInput; i++) {
            let boardRow = [];
            for (let j = i; j < i+9; j++) {
                if (this.strInput[j] === '0') {
                    boardRow.push(' ');
                } else {
                    boardRow.push(this.strInput[j]);
                }
            }
            board.push(boardRow);
            i = i+8;
        }

        return board;
    }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
// var fs = require('fs')
// var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
//   .toString()
//   .split("\n")[0]

var board_string = process.argv;

var board = [];

var game = new Sudoku(board_string[2])

console.log(game.board())

// Remember: this will just fill out what it can and not "guess"
console.log(game.solve());
