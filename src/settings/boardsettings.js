import { countAdjacentMines } from "./countmines"; 

//盤面の作成

export const createBoard = (rows,cols, mineCount) => {
    const board = [];
  
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push({
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          x: i,
          y: j,
          adjacentMines: 0,
        });
      }
      board.push(row);
    }
  
    let placedmines = 0;
    while (placedmines < mineCount) {
      const x = Math.floor(Math.random() * rows);
      const y = Math.floor(Math.random() * cols);
      if (!board[x][y].isMine) {
        board[x][y].isMine = true;
        placedmines++;
      }
    }
  
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        board[i][j].adjacentMines = countAdjacentMines(board, i ,j)
      }
    }
    return board;
};
  