import { useState, useEffect, Fragment } from "react";
import Crossword from "../crosswords/Crossword.js"
import PuzzlesByTableHeader from "./PuzzlesByTableHeader";

const PuzzlesByTable = (props) => {
  const puzzlesByTable = props.puzzlesByTable;
  const [currentPuzzle, setCurrentPuzzle] = useState(puzzlesByTable[0].id);
  const [isThisLastPuzzle, setIsThisLastPuzzle] = useState(false);
  const [isThisFirstPuzzle, setIsThisFirstPuzzle] = useState(true);

  useEffect(() => {
    let localCurrentPuzzle = localStorage.getItem("currentPuzzle") //get data saved to browswer

    if (localCurrentPuzzle !== null) { //was there data saved to browser?
      setCurrentPuzzle(localCurrentPuzzle); //use it
      const puzzleIndex = puzzlesByTable.findIndex(puzzle => puzzle.id === localCurrentPuzzle); //index of current puzzle
      if (puzzleIndex + 1 === puzzlesByTable.length) { //is this the last puzzle?
        setIsThisLastPuzzle(true);
      }
      if (puzzleIndex > 0) { //is this the first puzzle?
        setIsThisFirstPuzzle(false);
      }
    } else { //if not, save data to browser
      localStorage.setItem("currentPuzzle", currentPuzzle);
    }
  }, [puzzlesByTable, currentPuzzle, isThisLastPuzzle, isThisFirstPuzzle]);

  const nextPuzzleHandler = () => { //use previous puzzle's id to get the next puzzle in array
    let newPuzzleId = '';
    setCurrentPuzzle((currentPuzzleId) => {
      const puzzleIndex = puzzlesByTable.findIndex(puzzle => puzzle.id === currentPuzzleId); //index of puzzle just on
      newPuzzleId = puzzlesByTable[puzzleIndex + 1].id; //index of new puzzle
      if (puzzleIndex + 2 === puzzlesByTable.length) { //is the new puzzle the last puzzle?
        setIsThisLastPuzzle(true);
      }
      setIsThisFirstPuzzle(false);
      return newPuzzleId;
    })
    if (newPuzzleId !== "") {localStorage.setItem("currentPuzzle", newPuzzleId)};
  }

  const prevPuzzleHandler = () => { //use next puzzle's id to get the previous puzzle in array
    let newPuzzleId = '';
    setCurrentPuzzle((currentPuzzleId) => {
      const puzzleIndex = puzzlesByTable.findIndex(puzzle => puzzle.id === currentPuzzleId); //index of puzzle just on
      newPuzzleId = puzzlesByTable[puzzleIndex - 1].id; //index of new puzzle
      if (puzzleIndex - 1 === 0) { //is the new puzzle the first puzzle?
        setIsThisFirstPuzzle(true);
      }
      setIsThisLastPuzzle(false);
      return newPuzzleId;
    })
    if (newPuzzleId !== "") {localStorage.setItem("currentPuzzle", newPuzzleId)};
  }

  return (
    <Fragment>
      <PuzzlesByTableHeader 
        onNextPuzzle={nextPuzzleHandler}
        onPrevPuzzle={prevPuzzleHandler}
        isThisFirstPuzzle={isThisFirstPuzzle}
        isThisLastPuzzle={isThisLastPuzzle}
      />
      {(puzzlesByTable.find(puzzle => puzzle.id === currentPuzzle).type === "crossword") ? <Crossword
        initialCrosswordData={puzzlesByTable.find(puzzle => puzzle.id === currentPuzzle).cellData}
        acrossClues={puzzlesByTable.find(puzzle => puzzle.id === currentPuzzle).acrossClues}
        downClues={puzzlesByTable.find(puzzle => puzzle.id === currentPuzzle).downClues}
        answers={puzzlesByTable.find(puzzle => puzzle.id === currentPuzzle).answers}
        isThisLastPuzzle={isThisLastPuzzle}
        puzzleID={currentPuzzle}
      /> : null}
    </Fragment>
  );
};

export default PuzzlesByTable;
