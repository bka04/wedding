import { Fragment } from "react";
import Crossword from "../crosswords/Crossword.js"

const PuzzlesByTable = (props) => {
  const puzzlesByTable = props.puzzlesByTable;
  const currentPuzzle = props.currentPuzzle;

  return (
    <Fragment>
      {(puzzlesByTable.find(puzzle => puzzle.id === currentPuzzle).type === "crossword") ? 
      <Crossword
        initialCrosswordData={puzzlesByTable.find(puzzle => puzzle.id === currentPuzzle).cellData}
        acrossClues={puzzlesByTable.find(puzzle => puzzle.id === currentPuzzle).acrossClues}
        downClues={puzzlesByTable.find(puzzle => puzzle.id === currentPuzzle).downClues}
        answers={puzzlesByTable.find(puzzle => puzzle.id === currentPuzzle).answers}
        // isThisLastPuzzle={isThisLastPuzzle}
        puzzleID={currentPuzzle}
      /> : null}
    </Fragment>
  );
};

export default PuzzlesByTable;
