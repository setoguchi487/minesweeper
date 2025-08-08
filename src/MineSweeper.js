import {useEffect, useState} from 'react';
import './Styles.css';
import GamingHeader from './components/GamingHeader';
import Timer from './components/Timer';
import ControlButton from './components/ControlButton';
import SelectOptions from './components/SelectOptions';
import StatusMessage from './components/StatusMessage';
import Board from './components/Board';
import {getBoardSettings} from './settings/difficulty';
import { createBoard } from './settings/boardsettings';
import { 
  handleCellClick as onCellClick,
  handleRightClick as onRightClick, } from './handle';

export const MineSweeper = () => {
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [statusMessage, setStatus] = useState("Let's Play");
  const [flags, setFlags] = useState(0);
  const [gameCleared, setGameCleared] = useState(false);
  
//初期設定
  const startGame = () => {
    const { rows, cols, mines } = getBoardSettings(difficulty);
    const newBoard = createBoard(rows, cols, mines);
    setBoard(newBoard);
    setGameOver(false);
    setGameStarted(true);
    setTimerActive(true);
    setSeconds(0);
    setStatus("Let's Play")
    setFlags(mines);
    setGameCleared(false);
  };

  useEffect(() => {
    if (!timerActive)return;
    
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive]);

  useEffect(() => {
    setBoard([]);
    setGameStarted(false);
    setGameOver(false);
    setTimerActive(false);
    setSeconds(0);
  }, [difficulty]);

  const handleCellClick = (cell) => {
    onCellClick({
      cell,board,setBoard,gameStarted,gameOver,setGameOver,setTimerActive,setStatus,setGameCleared,
    });  
  };

  const handleRightClick = (e,x,y) => {
    onRightClick({
      e,x,y,board,setBoard,flags,setFlags,gameOver,gameStarted,
    });
  };

  return (
    <>
    <GamingHeader />
    <div className="Minesweeper">
      <Timer seconds={seconds} flags={flags} />
      <ControlButton 
        gameStarted={gameStarted}
        gameOver={gameOver}
        gameCleared={gameCleared}
        startGame={startGame}
      />
      <SelectOptions difficulty={difficulty} setDifficulty={setDifficulty}/>
      <Board board={board} handleCellClick={handleCellClick} handleRightClick={handleRightClick }/>
      <StatusMessage message={statusMessage} />
    </div>
    </>
  );     
};
