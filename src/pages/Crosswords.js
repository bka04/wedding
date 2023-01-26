import { useState, Fragment } from "react";
import PUZZLES from "../components/crosswords/CrosswordPuzzles";
import PuzzlesByTable from "../components/puzzles/PuzzlesByTable";
import PuzzlesHeader from "../components/puzzles/PuzzlesHeader";

const Crosswords = (props) => {
  const [currentTable, setCurrentTable] = useState('1');

  //set local storage and pull from there
  //do next and prev button handlers

  return (
    <Fragment>
      <PuzzlesHeader
        table={currentTable}
      />
      <PuzzlesByTable 
        puzzlesByTable={PUZZLES.filter(puzzle => puzzle.table === currentTable)}
      />
    </Fragment>
  );
};

export default Crosswords;
