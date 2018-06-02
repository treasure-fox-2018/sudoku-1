"use strict"
class Sudoku {
  constructor(board_string) {
    this.string = board_string
    this.rows = 9
    this.cols = 9
  }

  checkRows(i) {
    var selectedRow = game.board()[0]
    var selectRow = selectedRow.slice(0)
    var selectionRow = []
    var number = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    for (let i = 0; i < selectRow.length; i++) {
      var state = true
      if (selectRow[i] !== '0') {
        selectionRow.push(selectRow[i])
        // debugger;
      } else {
        while (state) {
          // debugger;
          for (var j = 0; j < number.length; j++) {
            var idxNumAngka = selectRow.indexOf(number[j])
            var idxNumSelection = selectionRow.indexOf(number[j])
            // debugger;
            if (idxNumAngka === -1 && idxNumSelection === -1) {
              state = false
              selectionRow.push(number[j])
              j = number.length
              // debugger;
            }
          }
        }
      }
    }
    // console.log('number', number)
    // console.log('index: ', selectRow)
    // console.log('select', selectionRow)
    return selectionRow
  }

  checkCols (i) {
    var mainBoard = game.board()
    var selectedCols = []
    for (let k = 0; k < mainBoard.length; k++) {
      selectedCols.push(mainBoard[k][i])
    }
    // console.log('this colomn: ', selectedCols)
    var selectionCols = []
    var number = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    for (let i = 0; i < selectedCols.length; i++) {
      var state = true
      if (selectedCols[i] !== '0') {
        selectionCols.push(selectedCols[i])
        // debugger;
      } else {
        while (state) {
          // debugger;
          for (var j = 0; j < number.length; j++) {
            var idxNumAngka = selectedCols.indexOf(number[j])
            var idxNumSelection = selectionCols.indexOf(number[j])
            // debugger;
            if (idxNumAngka === -1 && idxNumSelection === -1) {
              state = false
              selectionCols.push(number[j])
              j = number.length
              // debugger;
            }
          }
        }
      }
    }
    // console.log('number', number)
    // console.log('index: ', selectedCols)
    // console.log('select', selectionCols)
    return selectionCols
  }

  checkSquare (numRow) {
    //buat j dinamis dengan cara looping kelipatan 3
    // buat i dinamis dengan cara looping kelipatan 3
    var startSquarePos = {
      kotakSatu: [0, 0],
      kotakDua: [0, 3],
      kotakTiga: [0, 6],
      kotakEmpat: [3, 0],
      kotakLima: [3, 3],
      kotakEnam: [3, 6],
      kotakTujuh: [6, 0],
      kotakDelapan: [6, 3],
      kotakSembilan: [6, 6]
    }
    var mainBoard = game.board()
    var containSelect = []
    // console.log(startSquarePos.kotakDua[1])
    for (var key in startSquarePos) {
      var subContainSquare = []
      for(let i = startSquarePos[key][0]; i < 3+startSquarePos[key][0]; i++) {
        debugger
        for(let j = startSquarePos[key][1]; j < 3+startSquarePos[key][1]; j++) {
          debugger
          subContainSquare.push(mainBoard[i][j])
        }
      }
      containSelect.push(subContainSquare)
    }
      // console.log(containSelect)
      // console.log('this colomn: ', selectedCols)
      var selectionSquare = [] 
      var selectedSquare = containSelect[numRow]
      var number = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
      for (let i = 0; i < selectedSquare.length; i++) {
        var state = true
        if (selectedSquare[i] !== '0') {
          selectionSquare.push(selectedSquare[i])
          // debugger;
        } else {
          while (state) {
            // debugger;
            for (var j = 0; j < number.length; j++) {
              var idxNumAngka = selectedSquare.indexOf(number[j])
              var idxNumSelection = selectionSquare.indexOf(number[j])
              // debugger;
              if (idxNumAngka === -1 && idxNumSelection === -1) {
                state = false
                selectionSquare.push(number[j])
                j = number.length
                // debugger;
              }
            }
          }
        }
      }
      return selectionSquare
  }

  solve() {
    var mainBoard = game.board()
    for (let i = 0; i < 9; i++) {
      console.log(this.checkSquare(i))
    }
  }

  // Returns a string representing the current state of the board
  board() {
    var mainBoard = []
    var count = 0
    for (let i = 0; i < this.rows; i++) {
      var subBoard = []
      for (let j = 0; j < this.cols; j++) {
        subBoard.push(this.string[count])
        count += 1
      }
      mainBoard.push(subBoard)
    }

    return mainBoard
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

// console.log(game.board())
console.log(board_string);
console.log('ini board:' + '\n', game.board());
// console.log('ini solve:' + '\n', game.solve());
// console.log('ini check rows: ' + '\n', game.checkRows());
// console.log('ini check columns: ' + '\n', game.checkCols());
// console.log('ini check square: ' + '\n', game.checkSquare());
console.log('ini check solved: ' + '\n', game.solve());