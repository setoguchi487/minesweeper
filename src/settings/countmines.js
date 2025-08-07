//周囲8マスに地雷があるか
export const countAdjacentMines =(board, x, y) => {
    const rows = board.length;
    const cols = board[0].length;
    const directions = [
      [-1,-1], [-1,0], [-1,1],
      [0,-1],          [0,1],
      [1,-1], [1,0], [1,1],
    ];
  
    let count = 0;
    for (let [dx, dy] of directions) {
      const newX = x + dx
      const newY = y + dy
      if (
        newX >= 0 && newX < rows &&
        newY >= 0 && newY < cols &&
        board[newX][newY].isMine
      ){
        count++;
      }
    }
    return count;
};
  