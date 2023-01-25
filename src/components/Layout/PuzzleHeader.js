import Button from "../UI/Button";

const PuzzleHeader = (props) => {

  return (
    <div className='dark nextPuzzleDiv'>
      <Button className="prevPuzzleBtn" onClick={props.prevPuzzleHandler}>
        Previous Puzzle
      </Button>
      <Button className="nextPuzzleBtn" onClick={props.nextPuzzleHandler}>
        Next Puzzle
      </Button>
    </div>
  );
};

export default PuzzleHeader;
