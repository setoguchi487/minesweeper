const ControlButton = ({ gameStarted, startGame }) => (
    <div className="ControlButton">
        <button onClick={startGame}>
          {!gameStarted ? "Click to start" : "Restart" }
          </button>
    </div>
);

export default ControlButton;