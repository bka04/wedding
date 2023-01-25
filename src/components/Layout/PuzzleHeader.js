import Button from "../UI/Button";

const PuzzleHeader = (props) => {

  return (
    <div className='dark nextPuzzleDiv'>
      {props.isThisFirstPuzzle ? null : <Button className="prevPuzzleBtn" onClick={props.onPrevPuzzle}>
        Previous Puzzle
      </Button>}
      {props.isThisLastPuzzle ? null : <Button className="nextPuzzleBtn" onClick={props.onNextPuzzle}>
        Next Puzzle
      </Button>}
    </div>
  );
};

export default PuzzleHeader;
