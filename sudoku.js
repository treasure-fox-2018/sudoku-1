"use strict"

class Sudoku {
  constructor(boardString) {
    this.strBoard = boardString;
  }

  board() {
    var strToArr = this.strBoard;
    var arrSudoku = [];
    var arrTempo = [];
    for (let i = 0; i < 85; i++) {
      if (arrTempo.length === 9) {
        arrSudoku.push(arrTempo);
        arrTempo = [];
        i--;
      } else {
        arrTempo.push(strToArr[i])
      }
    }
    this.arr = arrSudoku;
    return this.arr;
  }

  solve() {
    var arr = this.arr;
    var arrZero = getArrZero(arr);

    // console.log(arrZero);
    // console.log(arrZero.length);
    // console.log(arrZero[30]);
    // console.log(arr);
    // console.log(arrZero);
    // var limit = 0;
    var counter = 0;
    while (counter !== arrZero.length) {
      var currentSolve = arr[arrZero[counter].arrIndex][arrZero[counter].elementIndex];
      // console.log(currentSolve);
      var element = increment(Number(currentSolve));
      if (element === false) {
        arr[arrZero[counter].arrIndex][arrZero[counter].elementIndex] = "0";
        counter --
      }
      var booleanConfirmedProcess = false;
      // console.log("element luar -> " + element);
      while (element !== false && booleanConfirmedProcess !== true) {
        // console.log("counterLuar-> " + counter);
        var block = blockObtain(arrZero[counter].arrIndex, arrZero[counter].elementIndex, arr);
        var booleanVertical = verticalChecker(element, arrZero[counter].arrIndex, arrZero[counter].elementIndex, arr);
        var booleanHorizontal = horizontalChecker(element, arrZero[counter].arrIndex, arrZero[counter].elementIndex, arr);
        var booleanBlock = blockCheck(element, arrZero[counter].arrIndex, arrZero[counter].elementIndex, arr, block);
        if (booleanVertical && booleanHorizontal && booleanBlock) {
          arr[arrZero[counter].arrIndex][arrZero[counter].elementIndex] = element;
          counter ++;
          // console.log("counterIF-> " + counter);
          // console.log("gantiIf");
          // console.log(arr);
          // sleep(1000)
          // reset_board();
          booleanConfirmedProcess = true;
        } else {
          element = increment(Number(element));
          // console.log("element -> " + element);
          if (element === false) {
            arr[arrZero[counter].arrIndex][arrZero[counter].elementIndex] = "0";
            // console.log("gantiElse");
            // console.log(arr);
            // sleep(1000)
            // reset_board();
            counter --;
            // console.log("counterIF2-> " + counter);
          }
        }
      }
    }
    return sudokoWrite(arr);

    function sudokoWrite(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (i === 3 || i === 6) {
          console.log("------------------------");
        }
        var horizontalContainer = " "
        for (let k = 0; k < arr[i].length; k++) {
          if (k === 2 || k === 5) {
            horizontalContainer += arr[i][k] + " | "
          } else {
            horizontalContainer += "" + arr[i][k] + " "
          }
        }
        console.log(horizontalContainer);
      }
      return "result Obtained";
    }

    function getArrZero(arr) {
      var zeroArr = []
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          var objZeroPosition = {};
          if (arr[i][j] === "0") {
            objZeroPosition.arrIndex = i;
            objZeroPosition.elementIndex = j;
            zeroArr.push(objZeroPosition)
          }
        }
      }
      return zeroArr;
    }

    function verticalChecker(element, arrIndex, elementIndex, arr) {
      for (let i = 0; i < 9; i++) {
        if (i === arrIndex) {
          i++;
        }
        if (i === 9) {
          return true;
        }
        let inspector = arr[i][elementIndex];
        // console.log(inspector);
        if (inspector === element) {
          return false;
        }
      }
      return true;
    }

    function horizontalChecker(element, arrIndex, elementIndex, arr) {
      for (let i = 0; i < 9; i++) {
        if (i === elementIndex) {
          i++;
        }
        if (i === 9) {
          return true;
        }
        let inspector = arr[arrIndex][i];
        // console.log(inspector);
        if (inspector === element) {
          return false;
        }
      }
      return true;
    }

    function blockObtain(arrIndex, elementIndex, arr) {
      var arrObjBlockPosiibilities = [{
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

    function blockCheck(element, arrIndex, elementIndex, arr, block) {
      let strBlockElements = "";
      let blockElementIndexs = block.elementIndexs;
      let blockArrIndexs = block.arrIndexs;

      for (let i = 0; i < blockElementIndexs.length; i++) {
        let currentArrIndex = blockArrIndexs[i];
        for (let j = 0; j < blockArrIndexs.length; j++) {
          let currentElementIndex = blockElementIndexs[j]
          if (currentArrIndex !== arrIndex || currentElementIndex !== elementIndex) {
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

    function linearSearch(target, values) {
      for (var q = 0; q < values.length; q++) {
        if (values[q] === target) {
          return q;
        }
      }
      return -1;
    }

    function increment(value) {
      let result = value + 1;
      if (result === 10) {
        return false;
      }
      return String(result);
    }

    function getNearestZeroPosition(arrIndex, elementIndex, arr) {
      for (let i = 0; i < arr.length; i++) {
        arrIndexAcces = arr[i].arrIndex;
        // console.log(arrIndexAcces);
        elementIndexAccess = arr[i].elementIndex;
        // console.log(elementIndexAccess);
        if (elementIndexAccess === elementIndex && arrIndexAcces === arrIndex) {
          return [arr[i - 1], (i - 1)]
        }
      }
    }

    function sleep(milliseconds) {
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
          break;
        }
      }
    }

    function reset_board() {
      console.log("\x1B[2J")
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

game.board()
console.log(game.solve());

// console.log(game.board());

// console.log(boardString);
