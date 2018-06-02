
"use strict"

class Sudoku {
    constructor(board_string) {
	  	this.sudokuContent = board_string
	  	this.sudokuBoard = this.unsolvedBoard()
  	}

	unsolvedBoard() {
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

	cekInHorizontal(board, row, col, guess){

		//console.log(board)
		//console.log(row)
		//console.log(col)
		for(let i = 0; i < 9; i++){
			//console.log(row)
			if(i !== col && board[row][i] === guess){
				return false;
			}
		}

		return true;
	}

	cekInVertical(board, row, col, guess){


		for(let i = 0; i < 9; i++){
			if(i !== col && board[i][col] === guess){
				return false;				
			}
		}

		return true;	
	}

	cekInBlock(board, row, col, guess){
	let y = Math.floor((row / 3)) * 3;
    let x = Math.floor((col / 3)) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i !== row && j !== col && board[y + i][x + j] === guess) {
          return false;
        }
      }
    }
    return true;
	}

	checkingInAll(board, row, col, guess){
		if(this.cekInHorizontal(board,row,col,guess) === true && this.cekInVertical(board,row,col,guess) === true && this.cekInBlock(board,row,col,guess) === true){
			return true
		} else return false; 
	}

	findEmptyIndex(){
		for(let i = 0; i < 9; i++){
			for(let j = 0; j < 9; j++){
				//console.log(i , j)
				//console.log(this.sudokuBoard[i][j])
				if(this.sudokuBoard[i][j] === 0){
					//console.log(this.sudokuBoard[i][j])
					//console.log(i, j)
					return[i,j]
				}
			}
		}

		return 'BoardFull';
	}

  	solve() {
  		let emptyIndex = this.findEmptyIndex();
  		let rowIndex = emptyIndex[0]
  		let colIndex = emptyIndex[1]

		//console.log(emptyIndex)
  		if(emptyIndex === 'BoardFull'){
  			return true;
  		}

  		for(let i = 1; i <= 9; i++){

  			if(this.checkingInAll(this.sudokuBoard, rowIndex, colIndex, i) === true){
  				//console.log(this.sudokuBoard)
  				this.sudokuBoard[rowIndex][colIndex] = i;

  				if(this.solve() === true){
  					return true;
  				}

  				this.sudokuBoard[rowIndex][colIndex] = 0
  			}
  		}

  		return false;
  	}

  // Returns a string representing the current state of the board
  board() {
	let unsolved = this.unsolvedBoard();
    for (let i = 0; i < 9; i++) {
      unsolved[i].splice(3, 0, "|");
      unsolved[i].splice(7, 0, "|");
      unsolved[i] = unsolved[i].join(" ");

      this.sudokuBoard[i].splice(3, 0, "|");
      this.sudokuBoard[i].splice(7, 0, "|");
      this.sudokuBoard[i] = this.sudokuBoard[i].join(" ");
    }

    let line = [];
    for (let j = 0; j < 21; j++) {
      line.push("-");
    }

    line = line.join("");

    for (let k = 0; k < 16; k += 4) {
      unsolved.splice(k, 0, line);
      this.sudokuBoard.splice(k, 0, line);
    }

    
    console.log("Unsolved Board :");
    console.log(unsolved.join("\n"));
    console.log("\n");
    console.log("Solve :");
    console.log(this.sudokuBoard.join("\n"));
  	
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

game.board()

