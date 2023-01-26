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

const getLastPuzzleOfTable = (table) => {
  const puzzlesOfTable = PUZZLES.filter(puzzle => puzzle.table === table);
  const maxPuzzleInt = Math.max(...puzzlesOfTable.map(puzzle => parseInt(puzzle.id))); 
  return maxPuzzleInt.toString();
}

const setFirstAndLastPuzzle = (state) => {
  state.isThisFirstPuzzle = (state.currentPuzzle === '1');
  state.isThisLastPuzzle = (state.currentPuzzle === getLastPuzzleOfTable(state.currentTable));
  return state;
}

const getPrevTable = (state) => {
  state.currentPuzzle = '1'; //for now, just set it to the first puzzle of the previous table

  let currentTableInt = parseInt(state.currentTable);
  currentTableInt -= 1;
  const currentTableString = currentTableInt.toString();

  if (PUZZLES.find(puzzle => puzzle.table === currentTableString)) { //can we find previous table?
    state.currentTable = currentTableString;
  } else {  // if not (eg previous on table 1 does not exist), get the max table
    const maxTableInt = Math.max(...PUZZLES.map(puzzle => parseInt(puzzle.table))); 
    const maxTableString = maxTableInt.toString();
    state.currentTable = maxTableString;
  }

  setFirstAndLastPuzzle(state);
  return state;
}

const getNextTable = (state) => {
  state.currentPuzzle = '1'; //for now, just set it to the first puzzle of the next table
  setFirstAndLastPuzzle(state);

  let currentTableInt = parseInt(state.currentTable);
  currentTableInt += 1;
  const currentTableString = currentTableInt.toString();

  if (PUZZLES.find(puzzle => puzzle.table === currentTableString)) {
    state.currentTable = currentTableString;
  } else {
    state.currentTable = '1';
  }

  setFirstAndLastPuzzle(state);
  return state;
}

const getPrevPuzzle = (state) => {
  let currentPuzzleInt = parseInt(state.currentPuzzle);
  currentPuzzleInt -= 1;
  const currentPuzzleString = currentPuzzleInt.toString();
  state.currentPuzzle = currentPuzzleInt > 0 ? currentPuzzleString : '1';

  setFirstAndLastPuzzle(state);
  return state;
}

const getNextPuzzle = (state) => {
  let currentPuzzleInt = parseInt(state.currentPuzzle);
  currentPuzzleInt += 1;
  const currentPuzzleString = currentPuzzleInt.toString();
  const lastPuzzleString = getLastPuzzleOfTable(state.currentTable);
  state.currentPuzzle = currentPuzzleInt <= parseInt(lastPuzzleString) ? currentPuzzleString : lastPuzzleString;

  setFirstAndLastPuzzle(state);
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
    setFirstAndLastPuzzle(newState);

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
        currentTable={state.currentTable}
      />
    </Fragment>
  );
};

export default Crosswords;
