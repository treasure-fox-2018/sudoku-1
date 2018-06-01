
"use strict"

class Sudoku {
    constructor(board_string) {
	  	this.sudokuContent = board_string
	  	this.unsolveBoard = this.unsolved()
  	}

	unsolved() {
	  	let mainBoard = []
	  	for(let i = 0; i < this.sudokuContent.length-1; i+=9){
	  		var boardRow = []
	  		for(let j = i ; j < i+9; j++){
	  			boardRow.push(+this.sudokuContent[j])
	  		}

	  		mainBoard.push(boardRow)
	  	}

	  	return mainBoard;
  	}

	cekNumberInRow(arr){
		let defaultNum = [1,2,3,4,5,6,7,8,9]

		let numInRow = []

		let newNumInRow = []

		for(let i = 0; i < arr.length; i++){
			if(arr[i] !== 0){
				if(defaultNum.indexOf(arr[i]) !== -1){
					numInRow.push(arr[i])
				}
			}
		}

		for(let j = 0; j < defaultNum.length; j++){

			if(numInRow.indexOf(defaultNum[j]) === -1){
				newNumInRow.push(defaultNum[j])
			}
		}

		return newNumInRow;
	}

	cekNumberInCol(numToCheck, indeksCol0){


		for(let i = 0; i < this.unsolveBoard.length; i++){
			if(this.unsolveBoard[i][indeksCol0] !== 0){
				if(this.unsolveBoard[i][indeksCol0] === numToCheck)
					return true;
			}
		}

		return false	
	}

  	solve() {

  		let solvedBoard = []

	  	for(let i = 0; i < this.unsolveBoard.length; i++){
	  		let newNumInRow = this.cekNumberInRow(this.unsolveBoard[i])
	  		//console.log(newNumInRow)
	  		//console.log(this.unsolveBoard[i])

	  		for(let j = 0; j < this.unsolveBoard[i].length; j++){
	  			//console.log(this.unsolveBoard[i][j])


	  			if(this.unsolveBoard[i][j] === 0){

	  				for(let m = 0; m < newNumInRow.length; m++){

	  					if(this.cekNumberInCol(newNumInRow[m], j) === true){
	  						let boxRow = Math.floor((i / 3) * 3)
	  						let boxCol = Math.floor((j / 3) * 3)

	  						for(let k = 0; k < 3; k++){
	  							for(let l = 0; l < 3; l++){
	  								if(k === i && l === j && this.unsolveBoard[boxRow + k][boxCol + j] !== newNumInRow[m]){

	  									this.unsolveBoard[i][j] = newNumInRow[m]
	  									newNumInRow.splice(m, 1)
	  								}
	  							}
	  						}


	  					}
	  				
	  				}	
	  				
	  			}


	  		}

	  		solvedBoard.push(this.unsolveBoard[i])

	  	}

	  	console.log(solvedBoard)

  	}

  // Returns a string representing the current state of the board
  board() {

  	for(let i = 0; i < this.unsolveBoard.length; i++){
  		this.unsolveBoard[i].splice(3, 0, "|");
    	this.unsolveBoard[i].splice(7, 0, "|");
    	this.unsolveBoard[i] = this.unsolveBoard[i].join(" ");

  	}

  	let line = [];
    for (let j = 0; j < 21; j++) {
      line.push("-");
    }

    line = line.join("");

    for (let k = 0; k < 16; k += 4) {
      this.unsolveBoard.splice(k, 0, line);
    }

    console.log("board :");
    for(let l = 0; l < this.unsolveBoard.length; l++){
    	console.log(this.unsolveBoard[l])
    }

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
game.board()
