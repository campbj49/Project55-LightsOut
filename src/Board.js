import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=5, ncols=5, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for(let row = 0; row<nrows;row++){
      initialBoard.push([]);
      for(let col = 0; col<ncols;col++){
        if(Math.random() >.5) initialBoard[row].push(true);
        else initialBoard[row].push(false);
      }
    }
    return initialBoard;
  }
  //returns bool of victory
  function hasWon() {
    let won = true;
    for(let row = 0; row<nrows;row++)
      for(let col = 0; col<ncols;col++)
        if(won &&board[row][col]) won = false;
    //console.log(won);
    return won;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      //Make a (deep) copy of the oldBoard
      let boardCopy = [];
      for(let row = 0; row<nrows;row++){
        boardCopy.push([]);
        for(let col = 0; col<ncols;col++){
          boardCopy[row].push(oldBoard[row][col]);
        }
      }

      //in the copy, flip this cell and the cells around it
      flipCell(y,x,boardCopy);
      flipCell(y+1,x,boardCopy)
      flipCell(y-1,x,boardCopy);
      flipCell(y,x+1,boardCopy);
      flipCell(y,x-1,boardCopy);

      //return the copy
      return boardCopy;
    });
  }

  //helper function that actally gets attatched to the cells
  function flipCellsAroundMe(evt){
    flipCellsAround(evt.target.id);
  }


  //create the board to be rendered in HTML
  let renderedBoard = [];
  for(let row = 0; row<nrows;row++){
    let filledRow = [];
    for(let col = 0; col<ncols;col++){
      filledRow.push(<Cell flipCellsAroundMe={flipCellsAroundMe} 
                          isLit={board[row][col]}
                          key = {`${row}-${col}`}
                          id = {`${row}-${col}`}
                          />);
    }
    renderedBoard.push(<tr>{filledRow}</tr>);
  }
  
  // if the game is won, just show a winning msg & render nothing else
  if(hasWon()) renderedBoard = (<td>You won</td>)
  return(
    <div className="Board">
      <table>
        <tbody>
          {renderedBoard}
        </tbody>
      </table>
    </div>
  )
}

export default Board;
