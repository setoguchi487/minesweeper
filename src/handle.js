import { countAdjacentMines } from "./settings/countmines";

//盤面の更新
const revealCell = (board, x, y, newBoard = board) => {
    const rows = board.length;
    const cols = board[0].length;
  
    if (x <0 || y < 0 || x >=rows || y >= cols || newBoard[x][y].isRevealed){
      return;
    }
  
    newBoard[x][y].isRevealed = true;
  
    if (newBoard[x][y].isMine) return;
  
    const count = countAdjacentMines(newBoard, x, y);
    newBoard[x][y].adjacentMines = count;
  
    if (count === 0){
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx !== 0 || dy !== 0){
            revealCell(newBoard, x + dx, y + dy, newBoard);
          }
        }
      }
    }
    return newBoard;
  };

export const  handleCellClick = ({
    cell,
    board,
    setBoard,
    gameStarted,
    gameOver,
    setGameOver,
    setStatus,
    setTimerActive,
    //setGameCleared,//setGameClearedの削除2025/9/24
}) => {
    if (!gameStarted || gameOver || cell.isRevealed) return;
    console.log("Clicked cell:", cell);

    const newBoard = board.map((row) => row.map((c) => ({ ...c })));

    if (cell.isMine){
      newBoard[cell.x][cell.y].isRevealed = true;

      for (let i = 0; i < newBoard.length; i++) {
        for (let j = 0; j < newBoard[0].length; j++) {
          if (newBoard[i][j].isMine) {
            newBoard[i][j].isRevealed  = true;
          }
        }
      }
      
      setBoard(newBoard);
      setGameOver(true);
      // alert("gameover");
      setTimerActive(false);
      setStatus("GameOver")
      return;
    }
    
    const updateBoard = revealCell(newBoard, cell.x, cell.y);
    setBoard(updateBoard);

    const gamecleared = updateBoard.every(row => row.every(cell => cell.isMine || cell.isRevealed));

    if(gamecleared){
      setTimerActive(false);
      setStatus("Game Clear!");
      setGameOver(true);
      //setGameCleared(true);
    }

    
};

export const handleRightClick = ({
  e,
  setBoard,
  x,
  y,
  gameStarted,
  gameOver,
  flags,
  setFlags
}) =>{
    e.preventDefault();

    if (gameOver || !gameStarted) return;
  

    setBoard((prevBoard) => {
      const newBoard = prevBoard.map(row => row.map(cell => ({...cell})));
      const cell = newBoard[x][y];
      if (!cell.isRevealed){
        if (cell.isFlagged){
          cell.isFlagged = false;
          setFlags(prev => prev + 1);
        }else if(flags > 0){
          cell.isFlagged = true;
          setFlags(flags - 1)
        }
      }
      return newBoard;
    });
};