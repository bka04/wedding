import { useState, useEffect, Fragment } from "react";
import Crossword from "../components/crosswords/Crossword";
import PUZZLES from "../components/crosswords/CrosswordPuzzles";
import PuzzleHeader from "../components/Layout/PuzzleHeader";


const defaultID = PUZZLES[0].id; 

const Crosswords = (props) => {
  const [currentPuzzle, setCurrentPuzzle] = useState(defaultID);
  const [isThisLastPuzzle, setIsThisLastPuzzle] = useState(false);
  const [isThisFirstPuzzle, setIsThisFirstPuzzle] = useState(true);

  useEffect(() => {
    const localCurrentPuzzle = localStorage.getItem("currentPuzzle") //get data saved to browswer

    if (localCurrentPuzzle !== null) { //was there data saved to browser?
      setCurrentPuzzle(localCurrentPuzzle); //use it
      const puzzleIndex = PUZZLES.findIndex(puzzle => puzzle.id === localCurrentPuzzle); //index of current puzzle
      if (puzzleIndex + 1 === PUZZLES.length) { //is this the last puzzle?
        setIsThisLastPuzzle(true);
      }
      if (puzzleIndex > 0) { //is this the first puzzle?
        setIsThisFirstPuzzle(false);
      }
    } else { //if not, save data to browser
      localStorage.setItem("currentPuzzle", currentPuzzle);
    }
  }, [currentPuzzle, isThisLastPuzzle, isThisFirstPuzzle]);

  const nextPuzzleHandler = () => { //use previous puzzle's id to get the next puzzle in array
    let newPuzzleId = '';
    setCurrentPuzzle((currentPuzzleId) => {
      const puzzleIndex = PUZZLES.findIndex(puzzle => puzzle.id === currentPuzzleId); //index of puzzle just on
      newPuzzleId = PUZZLES[puzzleIndex + 1].id; //index of new puzzle
      if (puzzleIndex + 2 === PUZZLES.length) { //is the new puzzle the last puzzle?
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
      const puzzleIndex = PUZZLES.findIndex(puzzle => puzzle.id === currentPuzzleId); //index of puzzle just on
      newPuzzleId = PUZZLES[puzzleIndex - 1].id; //index of new puzzle
      if (puzzleIndex - 1 === 0) { //is the new puzzle the first puzzle?
        setIsThisFirstPuzzle(true);
      }
      setIsThisLastPuzzle(false);
      return newPuzzleId;
    })
    if (newPuzzleId !== "") {localStorage.setItem("currentPuzzle", newPuzzleId)};
  }

  const startOverHandler = () => { //start over from the first puzzle
    setCurrentPuzzle(defaultID);
    setIsThisFirstPuzzle(true);
    setIsThisLastPuzzle(false);
    localStorage.setItem("currentPuzzle", defaultID);
  }

  return (
    <Fragment>
      <PuzzleHeader 
        onNextPuzzle={nextPuzzleHandler}
        onPrevPuzzle={prevPuzzleHandler}
        isThisFirstPuzzle={isThisFirstPuzzle}
        isThisLastPuzzle={isThisLastPuzzle}
      />
      <Crossword
        initialCrosswordData={PUZZLES.find(puzzle => puzzle.id === currentPuzzle).cellData}
        acrossClues={PUZZLES.find(puzzle => puzzle.id === currentPuzzle).acrossClues}
        downClues={PUZZLES.find(puzzle => puzzle.id === currentPuzzle).downClues}
        answers={PUZZLES.find(puzzle => puzzle.id === currentPuzzle).answers}
        // onNextPuzzle={nextPuzzleHandler}
        onStartOver={startOverHandler}
        isThisLastPuzzle={isThisLastPuzzle}
        puzzleID={currentPuzzle}
      />
    </Fragment>
  );
};

export default Crosswords;
