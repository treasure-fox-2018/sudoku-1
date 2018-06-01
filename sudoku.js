"use strict"

class Sudoku {
  constructor(boardString) {
    this.strBoard = boardString;
  }

  board() {
    var strToArr = this.strBoard;
    var arrSudoku = [];
    var arrTempo = [];
    for (let i = 0; i < strToArr.length; i++) {
      if (arrTempo.length === 9) {
        arrSudoku.push(arrTempo);
        arrTempo = [];
      }
      arrTempo.push(strToArr[i])
    }
    return arrSudoku;
  }

  solve() {
    horizontalChecker(element, elementIndex, arrIndex, arr) {
      for (let i = 0; i < arr[arrIndex].length; i++) {
        if (i === elementIndex) {
          i ++;
        }
        let inspector = arr[arrIndex][i];
        // console.log(inspector);
        if (inspector === element) {
          return false;
        }
      }
      return true;
    }

    verticalChecker(element, elementIndex, arrIndex, arr) {
      for (let i = 0; i < arr.length; i++) {
        if (i === arrIndex) {
          i ++;
        }
        let inspector = arr[i][elementIndex];
        // console.log(inspector);
        if (inspector === element) {
          return false;
        }
      }
      return true;
    }

    blockObtain(elementIndex, arrIndex, arr) {
      var arrObjBlockPosiibilities = [
        {
          arrIndexs: [0, 1, 2],
          elementIndexs: [0, 1, 2]
        },
        {
          arrIndexs: [3, 4, 5],
          elementIndexs: [0, 1, 2]
        },
        {
          arrIndexs: [6, 7, 8],
          elementIndexs: [0, 1, 2]
        },
        {
          arrIndexs: [0, 1, 2],
          elementIndexs: [3, 4, 5]
        },
        {
          arrIndexs: [0, 1, 2],
          elementIndexs: [6, 7, 8]
        },
        {
          arrIndexs: [6, 7, 8],
          elementIndexs: [6, 7, 8]
        },
        {
          arrIndexs: [3, 4, 5],
          elementIndexs: [3, 4, 5]
        },
        {
          arrIndexs: [6, 7, 8],
          elementIndexs: [3, 4, 5]
        },
        {
          arrIndexs: [3, 4, 5],
          elementIndexs: [6, 7, 8]
        }
      ]

      for (let i = 0; i < arrObjBlockPosiibilities.length; i++) {
        let arrInspector = arrObjBlockPosiibilities[i];
        let arrInspectorArrAcess = arrInspector.arrIndexs;
        let arrInspectorElementAccess = arrInspector.elementIndexs;

        if (linearSearch(elementIndex, arrInspectorElementAccess) !== -1 && linearSearch(arrIndex, arrInspectorArrAcess) !== -1) {
          return arrInspector
        }
      }
    }

    blockCheck(element, elementIndex, arrIndex, arr, block) {
      let strBlockElements = "";
      let blockElementIndexs = block.elementIndexs;
      let blockArrIndexs = block.arrIndexs;

      for (let i = 0; i < 3; i++) {
        let currentArrIndex = blockArrIndexs[i];
        for (let j = 0; j < 3; j++) {
          let currentElementIndex = blockElementIndexs[j]
          if (currentArrIndex !== arrIndex && currentElementIndex !== elementIndex) {
            strBlockElements += arr[currentArrIndex][currentElementIndex]
          }
        }
      }

      // console.log(strBlockElements);

      if (linearSearch(element, strBlockElements) !== -1) {
        return false;
      }
      return true;
    }

    linearSearch(target, values) {
      for (var q = 0; q < values.length; q++) {
        if (values[q] === target) {
          return q;
        }
      }
      return -1;
    }
  }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs');
var boardString = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0];

var game = new Sudoku(boardString);

// Remember: this will just fill out what it can and not "guess"
game.solve();

console.log(game.board());

// console.log(boardString);
