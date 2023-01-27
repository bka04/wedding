import { Fragment } from "react";
import Button from "../UI/Button";
import './PuzzlesHeader.css';

const PuzzlesHeader = (props) => {

  return (
    <Fragment>
    <div className='dark nextTableDiv'>
      <Button className="puzzleHeaderBtn active" onClick={props.onPrevTable}>
        Previous Table
      </Button>
      <h4 className="tableNum">Table {props.table}</h4>
      <Button className="puzzleHeaderBtn active" onClick={props.onNextTable}>
        Next Table
      </Button>
    </div>
    <div className='dark nextPuzzleDiv'>
      {<Button 
        className={`puzzleHeaderBtn ${props.isThisFirstPuzzle ? "" : " active"}`}
        onClick={props.onPrevPuzzle}
        disabled={props.isThisFirstPuzzle ? "true" : "false"}
      >
        Previous Puzzle
      </Button>}
      <h5 className="tableNum">Puzzle {props.puzzle} of {props.lastPuzzle}</h5>
      {<Button 
        className={`puzzleHeaderBtn ${props.isThisLastPuzzle ? "" : " active"}`}
        onClick={props.onNextPuzzle}
        disabled={props.isThisLastPuzzle ? "true" : "false"}
        >
        Next Puzzle
      </Button>}
    </div>
  </Fragment>
  );
};

export default PuzzlesHeader;
