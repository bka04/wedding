import "./CrosswordClues.css";

const CrosswordClues = (props) => {

  return (
    <div className="clues">
      <h4>{props.clueDirection}</h4>
      <ul className="clueList">
        {props.clues.map((clue) => {
          return (
            <li
              key={clue.number}
              data-direction={props.clueDirection}
              data-question-number={clue.number}
              className={
                props.clueDirection === props.selectedDirection &&
                clue.number === props.selectedQuestion
                  ? "highlight"
                  : ""
              }
              onClick={props.onClick}
            >
              {clue.number}. &nbsp;{clue.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CrosswordClues;
