"use strict"

var board_string = process.argv;

var board = [];

class Sudoku {
    constructor(board_string) {
        this.strInput = board_string;
        this.lengInput = board_string.length;
    }

    solve() {
        fillBlank();
        return board;
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

function fillBlank() {
    let numbers = ['1','2','3','4','5','6','7','8','9'];

    for (let i = 0; i < board.length; i++) {
        // console.log('----- ROW KE : '+i);
        for (let j = 0; j < board[i].length; j++) {
            // create array column down
            // console.log(j);
            if (board[i][j] === ' ') {
                let arrColumn = createArrayColumnDown(j);
                for (let k = 0; k < numbers.length; k++) {
                    if (checkBox(i, j, numbers[k]) === false && board[i].includes(numbers[k]) === false && arrColumn.includes(numbers[k]) === false) {
                        // console.log('board before :'+board[i]+' num input'+numbers[k]);
                        // console.log('column  down: '+arrColumn);
                        board[i][j] = numbers[k];
                        // console.log('board after : '+board[i]);
                        k = numbers.length;
                    }
                }
            }
        }
     }
}

function checkBox(row, col, num) {
    let arrMiniBox;

    if (row < 3 && col < 3) {
        arrMiniBox = createMiniBox(3,3);
        return checkDuplicates(arrMiniBox, num);
    } else if (row < 3 && col < 6) {
        arrMiniBox = createMiniBox(3,6);
        return checkDuplicates(arrMiniBox, num);
    } else if (row < 3 && col < 9) {
        arrMiniBox = createMiniBox(3,6);
        return checkDuplicates(arrMiniBox, num);
    } else if (row < 6 && col < 3) {
        arrMiniBox = createMiniBox(3,6);
        return checkDuplicates(arrMiniBox, num);
    } else if (row < 6 && col < 6) {
        arrMiniBox = createMiniBox(3,6);
        return checkDuplicates(arrMiniBox, num);
    } else if (row < 6 && col < 9) {
        arrMiniBox = createMiniBox(3,6);
        return checkDuplicates(arrMiniBox, num);
    } else if (row < 9 && col < 3) {
        arrMiniBox = createMiniBox(3,6);
        return checkDuplicates(arrMiniBox, num);
    } else if (row < 9 && col < 6) {
        arrMiniBox = createMiniBox(3,6);
        return checkDuplicates(arrMiniBox, num);
    } else if (row < 9 && col < 9) {
        arrMiniBox = createMiniBox(3,6);
        return checkDuplicates(arrMiniBox, num);
    }
}

function createMiniBox(row, col) {
    let miniBox = [];
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            miniBox.push(board[i][j]);
        }
    }
    return miniBox;
}

function checkDuplicates(arrBox, numberCheck) {
    if (arrBox.includes(numberCheck) === true) {
        return true;
    } else {
        return false;
    }
}

function createArrayColumnDown(col) {
    let arrColumnDown = [];
    // console.log(col);
    for (let i = 0; i < board.length; i++) {
        arrColumnDown.push(board[i][col]);
    }

    return arrColumnDown;
}

function checkMiniBox() {



}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
// var fs = require('fs')
// var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
//   .toString()
//   .split("\n")[0]

var game = new Sudoku(board_string[2])

console.log(game.board())

console.log();

// Remember: this will just fill out what it can and not "guess"
console.log(game.solve());
