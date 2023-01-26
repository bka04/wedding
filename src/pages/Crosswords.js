import { useState, useEffect, Fragment } from "react";
import PUZZLES from "../components/crosswords/CrosswordPuzzles";
import PuzzlesByTable from "../components/puzzles/PuzzlesByTable";
import PuzzlesHeader from "../components/puzzles/PuzzlesHeader";

const Crosswords = (props) => {
  const [currentTable, setCurrentTable] = useState('1');

  useEffect(() => {
    const localCurrentTable = localStorage.getItem("currentTable") //get data saved to browswer

    if (localCurrentTable !== null) { //was there data saved to browser?
      setCurrentTable(localCurrentTable); //use it
    } 
    // else { //if not, save data to browser
    //   localStorage.setItem("currentTable", currentTable);
    // }
  }, []);

  //set local storage and pull from there
  //do next and prev button handlers

  const prevTableHandler = () => {
    setCurrentTable((currTab) => {
      let currTabInt = parseInt(currTab);
      currTabInt -= 1;
      const currTabStr = currTabInt.toString();
      if (PUZZLES.find(puzzle => puzzle.table === currTabStr)) {
        localStorage.setItem("currentTable", currTabStr);
        return currTabStr; //next table
      } else {
        const maxTableInt = Math.max(...PUZZLES.map(puzzle => parseInt(puzzle.table)));
        const maxTableStr = maxTableInt.toString();
        localStorage.setItem("currentTable", maxTableStr);
        return maxTableStr;
      }
    })
  }

  const nextTableHandler = () => {
    setCurrentTable((currTab) => {
      let currTabInt = parseInt(currTab);
      currTabInt += 1;
      const currTabStr = currTabInt.toString();
      if (PUZZLES.find(puzzle => puzzle.table === currTabStr)) {
        localStorage.setItem("currentTable", currTabStr);
        return currTabStr; //next table
      } else {
        localStorage.setItem("currentTable", "1");
        return "1"; //start over at first table
      }
    })
  }

  return (
    <Fragment>
      <PuzzlesHeader
        table={currentTable}
        onPrevTable={prevTableHandler}
        onNextTable={nextTableHandler}
      />
      <PuzzlesByTable 
        puzzlesByTable={PUZZLES.filter(puzzle => puzzle.table === currentTable)}
      />
    </Fragment>
  );
};

export default Crosswords;
