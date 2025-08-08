const Board = ({ board, handleCellClick, handleRightClick }) => (
    <div className="Board">
        {board.map((row, i) => (
          <div key={`row-${i}`} className="Row">
            {row.map((cell,j) => (
              <div
                key={`${i}-${j}`}
                  className={`Cell
                    ${cell.isRevealed ? 'Revealed': ''}
                    ${cell.isFlagged ? 'flagged': ''}`}
                  data-value={cell.adjacentMines}
                onClick={() => handleCellClick(cell)}
                onContextMenu={(e) => handleRightClick(e, cell.x, cell.y)}
              >
                {cell.isRevealed 
                ? (cell.isMine ? '💣' : (cell.adjacentMines || ''))
                : (cell.isFlagged ? '🚩': '')}
              </div>
            ))}
          </div>
        ))}
      </div>
);

export default Board;