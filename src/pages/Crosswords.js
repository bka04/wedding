import { useState, useEffect } from "react";
import Crossword from "../components/crosswords/Crossword";
import PUZZLES from "../components/crosswords/CrosswordPuzzles";


const defaultID = PUZZLES[0].id; 

const Crosswords = (props) => {
  const [currentPuzzle, setCurrentPuzzle] = useState(defaultID);
  const [isThisLastPuzzle, setIsThisLastPuzzle] = useState(false);

  useEffect(() => {
    const localCurrentPuzzle = localStorage.getItem("currentPuzzle") //get data saved to browswer

    if (localCurrentPuzzle !== null) { //was there data saved to browser?
      setCurrentPuzzle(localCurrentPuzzle); //use it
      const puzzleIndex = PUZZLES.findIndex(puzzle => puzzle.id === localCurrentPuzzle); //index of current puzzle
      if (puzzleIndex + 1 === PUZZLES.length) { //is this the last puzzle?
        setIsThisLastPuzzle(true);
      }
    } else { //if not, save data to browser
      localStorage.setItem("currentPuzzle", currentPuzzle);
    }
  }, [currentPuzzle, isThisLastPuzzle]);

  const nextPuzzleHandler = () => { //use previous puzzle's id to get the next puzzle in array
    let newPuzzle = '';
    setCurrentPuzzle((prevPuzzle) => {
      const puzzleIndex = PUZZLES.findIndex(puzzle => puzzle.id === prevPuzzle); //index of puzzle just solved
      newPuzzle = PUZZLES[puzzleIndex + 1].id; //index of new puzzle
      if (puzzleIndex + 2 === PUZZLES.length) { //is the new puzzle the last puzzle?
        setIsThisLastPuzzle(true);
      }
      return newPuzzle;
    })
    localStorage.setItem("currentPuzzle", newPuzzle);
  }

  const startOverHandler = () => { //start over from the first puzzle
    setCurrentPuzzle(defaultID);
    setIsThisLastPuzzle(false);
    localStorage.setItem("currentPuzzle", defaultID);
  }

  return (
    <Crossword
      initialCrosswordData={PUZZLES.find(puzzle => puzzle.id === currentPuzzle).cellData}
      acrossClues={PUZZLES.find(puzzle => puzzle.id === currentPuzzle).acrossClues}
      downClues={PUZZLES.find(puzzle => puzzle.id === currentPuzzle).downClues}
      answers={PUZZLES.find(puzzle => puzzle.id === currentPuzzle).answers}
      onNextPuzzle={nextPuzzleHandler}
      onStartOver={startOverHandler}
      isThisLastPuzzle={isThisLastPuzzle}
    />
  );
};

export default Crosswords;
