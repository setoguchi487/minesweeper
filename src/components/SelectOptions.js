const SelectOptions = ({ difficulty, setDifficulty}) => (
    <div className="SelectOptions">
        <label>Difficulty: </label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="very hard">Very Hard</option>
        </select>
    </div>
);

export default SelectOptions;