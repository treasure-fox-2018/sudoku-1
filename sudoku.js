"use strict"

var board_string = process.argv;

var board = [];

/**
 * @class sudoku
 * class sudoku to create a sudoku board game
 */

class Sudoku {
    constructor(board_string) {
        this.strInput = board_string;
        this.lengInput = board_string.length;
    }

    solve() {
        fillBlank();
        return board;
    }

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

/**
 * @function fillBlank
 * mengisi angka pada board kosong sesuai kondisi row, column, dan box 3x3 tidak ada duplikat
 */

function fillBlank() {
    let numbers = ['1','2','3','4','5','6','7','8','9'];

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === ' ') {
                let arrColumn = createArrayColumnDown(j);
                for (let k = 0; k < numbers.length; k++) {
                    // this code below is the combination of chek 3x3 box and check one row and check one column. It will assign the number if all check match the condition
                    // if (checkDuplicates(arrColumn, numbers[k]) === false && checkBox(i, j, numbers[k]) === false && checkDuplicates(board[i], numbers[k]) === false) {
                    // this code below is the combination of check one row and check one column ONLY. Will assign the number if all check match the condition
                    if (checkDuplicates(board[i], numbers[k]) === false && checkDuplicates(arrColumn, numbers[k]) === false) {
                        board[i][j] = numbers[k];
                        k = numbers.length;
                    }
                }
            }
        }
     }
}

/**
 * @function checkBox
 * fungsi akan menerima koordinat board dan menentukan ada di bagian box 3z3 yang mana, kemudian melakukan cek pada box 3z3 tersebut
 * @param {integer} row nilai baris and @param {integer} col nilai kolom and @param {integer} num nilai basis yang akan dicek kemungkinan dapat disii pada board
 * @returns {boolean} mengembalikan kondisi apakah num berada pada bagian box 3x3 sesuai koordinat pada board
 */

function checkBox(row, col, num) {
    let arrMiniBox;

    if (row < 3 && col < 3) {
        arrMiniBox = createMiniBox(3,3);
        return checkDuplicates(arrMiniBox, num);
    } else if (row < 3 && col < 6) {
        arrMiniBox = createMiniBox(3,6);
        return checkDuplicates(arrMiniBox, num);
    } else if (row < 3 && col < 9) {
        arrMiniBox = createMiniBox(3,9);
        return checkDuplicates(arrMiniBox, num);
    } else if (row < 6 && col < 3) {
        arrMiniBox = createMiniBox(6,3);
        return checkDuplicates(arrMiniBox, num);
    } else if (row < 6 && col < 6) {
        arrMiniBox = createMiniBox(6,6);
        return checkDuplicates(arrMiniBox, num);
    } else if (row < 6 && col < 9) {
        arrMiniBox = createMiniBox(6,9);
        return checkDuplicates(arrMiniBox, num);
    } else if (row < 9 && col < 3) {
        arrMiniBox = createMiniBox(9,3);
        return checkDuplicates(arrMiniBox, num);
    } else if (row < 9 && col < 6) {
        arrMiniBox = createMiniBox(9,6);
        return checkDuplicates(arrMiniBox, num);
    } else if (row < 9 && col < 9) {
        arrMiniBox = createMiniBox(9,9);
        return checkDuplicates(arrMiniBox, num);
    }
}

/**
 * @function createMiniBox
 * fungsi membuat array beradasarkan box 3x3 pada koordinat yang diterima
 * @param {integer} row nilai baris and @param {integer} col nilai kolom
 * @returns {array} mengembalikan array berisi nilai-nilai yang terdapat pada box 3x3 sesuai bagian dimana koordinat berada
 */

function createMiniBox(row, col) {
    let miniBox = [];
    console.log(row+'-'+col);
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            miniBox.push(board[i][j]);
        }
    }
    return miniBox;
}

/**
 * @function checkDuplicates
 * fungsi melakukan pengecekan terhadap nilai pada sebuah array
 * @param {array} arrBox array berisi kumpulan angka pada board @param {integer} numberCheck nilai yang akan menjadi basis pencarian
 * @returns {boolean} mengembalikan true apabila numberCheck terdapat pada arrBox, dan sebaliknya
 */

function checkDuplicates(arrBox, numberCheck) {
    if (arrBox.includes(numberCheck) === true) {
        return true;
    } else {
        return false;
    }
}

/**
 * @function createArrayColumnDown
 * fungsi membuat array beradasarkan nilai/ value yang terdapat pada board di kolom tertentu
 * @param {integer} col nilai kolom
 * @returns {array} mengembalikan array berisi nilai-nilai yang terdapat pada board di col tersebut
 */

function createArrayColumnDown(col) {
    let arrColumnDown = [];
    // console.log(col);
    for (let i = 0; i < board.length; i++) {
        arrColumnDown.push(board[i][col]);
    }

    return arrColumnDown;
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[5]

// this type below is for test case program with input from command line
// var game = new Sudoku(board_string[2])
var game = new Sudoku(board_string)

console.log(game.board());

// separate between original board with the result board
console.log();

// Remember: this will just fill out what it can and not "guess"
console.log(game.solve());
