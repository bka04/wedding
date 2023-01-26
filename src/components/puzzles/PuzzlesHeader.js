import { Fragment } from "react";
import Button from "../UI/Button";
import './PuzzlesHeader.css';

const PuzzlesHeader = (props) => {

  return (
    <Fragment>
    <div className='dark nextTableDiv'>
      <Button className="prevTableBtn" onClick={props.onPrevTable}>
        Previous Table
      </Button>
      <h4 className="tableNum">Table {props.table}</h4>
      <Button className="nextTableBtn" onClick={props.onNextTable}>
        Next Table
      </Button>
    </div>
    <div className='dark nextPuzzleDiv'>
      {props.isThisFirstPuzzle ? null : <Button className="prevPuzzleBtn" onClick={props.onPrevPuzzle}>
        Previous Puzzle
      </Button>}
      {props.isThisLastPuzzle ? null : <Button className="nextPuzzleBtn" onClick={props.onNextPuzzle}>
        Next Puzzle
      </Button>}
    </div>
  </Fragment>
  );
};

export default PuzzlesHeader;
