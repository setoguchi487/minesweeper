const Timer =({ seconds, flags }) => (
    <div className="Timer">
        <span>Time⏱️: {seconds}s</span>
        <span>Flags🚩: {flags}</span>
    </div>
);

export default Timer;