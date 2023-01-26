import { Fragment } from "react";
import Crossword from "../crosswords/Crossword.js"

const PuzzlesByTable = (props) => {
  const {puzzlesByTable, currentPuzzle, currentTable} = props;

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
        tableID={currentTable}
      /> : null}
    </Fragment>
  );
};

export default PuzzlesByTable;
