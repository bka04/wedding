import { useEffect, useReducer, Fragment } from "react";
import PUZZLES from "../components/crosswords/CrosswordPuzzles";
import PuzzlesByTable from "../components/puzzles/PuzzlesByTable";
import PuzzlesHeader from "../components/puzzles/PuzzlesHeader";

const initialState = {
  currentTable: '1',
  currentPuzzle: '1',
  isThisLastPuzzle: false,
  isThisFirstPuzzle: true
};

const savePuzzleData = (state) => {
  localStorage.setItem("currentTable", state.currentTable)
  localStorage.setItem("currentPuzzle", state.currentPuzzle)
}

//NEED TO UPDATE THESE TO LOOK AT TABLE TOO

const getPrevTable = (state) => {
  let currentTableInt = parseInt(state.currentTable);
  currentTableInt -= 1;
  const currentTableString = currentTableInt.toString();
  if (PUZZLES.find(puzzle => puzzle.table === currentTableString)) { //can we find previous table?
    state.currentTable = currentTableString;
    return state; //return state updated with previous table
  } else {  // if not (eg previous on table 1 does not exist), get the max table
    const maxTableInt = Math.max(...PUZZLES.map(puzzle => parseInt(puzzle.table))); 
    const maxTableString = maxTableInt.toString();
    state.currentTable = maxTableString;
    return state;
  }
}

const getNextTable = (state) => {
  let currentTableInt = parseInt(state.currentTable);
  currentTableInt += 1;
  const currentTableString = currentTableInt.toString();
  if (PUZZLES.find(puzzle => puzzle.table === currentTableString)) {
    state.currentTable = currentTableString;
    return state; //return state updated with next table
  } else {
    state.currentTable = '1';
    return state; //return state with first table
  }
}

const getPrevPuzzle = (state) => {
  const puzzleIndex = PUZZLES.findIndex(puzzle => puzzle.id === state.currentPuzzle); //index of puzzle just on
  state.currentPuzzle = PUZZLES[puzzleIndex - 1].id; //index of new puzzle
  if (puzzleIndex - 1 === 0) { //is the new puzzle the first puzzle?
    state.isThisFirstPuzzle = true;
  }
  state.isThisLastPuzzle = false;
  return state;
}

const getNextPuzzle = (state) => {
  const puzzleIndex = PUZZLES.findIndex(puzzle => puzzle.id === state.currentPuzzle); //index of puzzle just on
  state.currentPuzzle = PUZZLES[puzzleIndex + 1].id; //index of new puzzle
  if (puzzleIndex + 2 === PUZZLES.length) { //is the new puzzle the last puzzle?
    state.isThisLastPuzzle = true;
  }
  state.isThisFirstPuzzle = false;
  return state;
}

const reducer = (state, action) => {

  let newState = {...state}; //to avoid directly mutating state

  if (action.type === "loadStateFromStorage") {
    let localCurrentTable = localStorage.getItem("currentTable") //get data saved to browswer
    let localCurrentPuzzle = localStorage.getItem("currentPuzzle") //get data saved to browswer
    
    localCurrentTable = localCurrentTable ? localCurrentTable : '1';
    localCurrentPuzzle = localCurrentPuzzle ? localCurrentPuzzle : '1';
    
    newState.currentTable = localCurrentTable;
    newState.currentPuzzle = localCurrentPuzzle;
    //NEED TO UDPATE IS THIS FIRST/LAST PUZZLE! - pull out code from other methods into a new one

    savePuzzleData(newState);
    return newState;
  }

  if (action.type === "prevTable") {
    getPrevTable(newState);
    newState.currentPuzzle = '1'; //for now, just reset to the first puzzle
    savePuzzleData(newState);
    return newState;
  }

  if (action.type === "nextTable") {
    getNextTable(newState);
    newState.currentPuzzle = '1'; //for now, just reset to the first puzzle
    savePuzzleData(newState);
    return newState;
  }

  if (action.type === "prevPuzzle") {
    getPrevPuzzle(newState);
    savePuzzleData(newState);
    return newState;
  }

  if (action.type === "nextPuzzle") {
    getNextPuzzle(newState);
    savePuzzleData(newState);
    return newState;
  }

}


const Crosswords = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    dispatch({ type: "loadStateFromStorage" });
  }, []);

  const prevTableHandler = () => {
    dispatch({ type: "prevTable" });
  };

  const nextTableHandler = () => {
    dispatch({ type: "nextTable" });
  };

  const prevPuzzleHandler = () => {
    dispatch({ type: "prevPuzzle" });
  };

  const nextPuzzleHandler = () => {
    dispatch({ type: "nextPuzzle" });
  };


  return (
    <Fragment>
      <PuzzlesHeader
        table={state.currentTable}
        onPrevTable={prevTableHandler}
        onNextTable={nextTableHandler}
        onNextPuzzle={nextPuzzleHandler}
        onPrevPuzzle={prevPuzzleHandler}
        isThisFirstPuzzle={state.isThisFirstPuzzle}
        isThisLastPuzzle={state.isThisLastPuzzle}
      />
      <PuzzlesByTable 
        puzzlesByTable={PUZZLES.filter(puzzle => puzzle.table === state.currentTable)}
        currentPuzzle={state.currentPuzzle}
      />
    </Fragment>
  );
};

export default Crosswords;
