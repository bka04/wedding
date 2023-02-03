import "./Jumble.css";
import { useReducer, useEffect } from "react";
import Card from "../UI/Card";
import JumbleCell from "./JumbleCell";
import crosswordMethods from "../crosswords/CrosswordMethods";

const initialState = {
  cellData: [],
  selectedCell: 0,
  solved: false,
  availableLetters: []
};

const shuffle = (array) => {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex !== 0) { // while elements remain to shuffle

    // get a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // swap with the current element
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const shuffleAvailableLetters = (availableLetters) => {
  //split out not used and used letters. shuffle the not used letters and combine.
  const shuffledNotUsedLetters = shuffle(availableLetters.filter(letter => !letter.usedInGuess));
  const usedLetters = availableLetters.filter(letter => letter.usedInGuess);
  return shuffledNotUsedLetters.concat(usedLetters);
}

const clearCellDisplay = (cellData) => {
  return cellData.map((cell) => ({
    ...cell,
    focus: false
  })); 
}

const getNextLetterCellIndex = (state, index, wrap = true) => {
  const letterCells = state.cellData.filter(cell => cell.type === "letter");
  letterCells.sort((a, b) => a.index - b.index);
  const letterCellIndex = letterCells.findIndex(cell => cell.index === index);
  return letterCells[letterCellIndex + 1] ? letterCells[letterCellIndex + 1].index : 
    wrap ? letterCells[0].index : letterCells[letterCellIndex].index;
}

const getPrevLetterCellIndex = (state, index, wrap = true) => {
  const letterCells = state.cellData.filter(cell => cell.type === "letter");
  letterCells.sort((a, b) => b.index - a.index);
  const letterCellIndex = letterCells.findIndex(cell => cell.index === index);
  return letterCells[letterCellIndex + 1] ? letterCells[letterCellIndex + 1].index : 
  wrap ? letterCells[0].index : letterCells[letterCellIndex].index;
}

const markAvailableLettersAsUsed = (state) => {
  // clear out usedInGuess so we can set it again
  state.availableLetters = state.availableLetters.map((letterData) => ({
    ...letterData,
    usedInGuess: false
  })); 

  // get letters entered into cells
  const cellDataLetters = state.cellData.filter(cell => (cell.type === "letter" && cell.cellValue !== "")); 

  cellDataLetters.forEach((cell) => {
    const foundIndex = state.availableLetters.findLastIndex(letter => (letter.letter.toLowerCase() === cell.cellValue.toLowerCase()) && (!letter.usedInGuess));
    if (foundIndex > -1) {
      state.availableLetters[foundIndex].usedInGuess = true;
    }
  })

  return state;
}

const mapAvailableLetters = (letterArray) => {
  return letterArray.map((letter) => {
    return {
      letter: letter,
      usedInGuess: false
    }
  });
}


const reducer = (state, action) => {

  if (action.type === "loadStateFromStorage") {
    //get the most recent available letters in case user went back to crosswords
    const availableLetters = mapAvailableLetters(crosswordMethods.getJumbleAvailableLettersFromCrosswords(action.tableID, action.puzzleID))
    action.storedCrosswordData.availableLetters = availableLetters;
    const newState = markAvailableLettersAsUsed(action.storedCrosswordData);
    return {
      cellData: newState.cellData,
      selectedCell: newState.selectedCell,
      solved: newState.solved,
      availableLetters: shuffleAvailableLetters(newState.availableLetters)
    };
  }
  if (action.type === "setData") {
    const availableLetters = mapAvailableLetters(crosswordMethods.getJumbleAvailableLettersFromCrosswords(action.tableID, action.puzzleID))
    return {
      cellData: action.initialCellData,
      selectedCell: 0,
      solved: false,
      availableLetters: shuffleAvailableLetters(availableLetters)
    };
  }

  let newState = {...state, cellData: state.cellData.slice()}; //to avoid directly mutating state
  
  if (action.type === "shuffleAvailableLetters") {
    const jumbleData = {
      cellData: newState.cellData,
      selectedCell: newState.index,
      solved: newState.solved,
      availableLetters: shuffleAvailableLetters(newState.availableLetters)
    }
    crosswordMethods.saveCrosswordData(jumbleData, action.puzzleID, action.tableID);
    return jumbleData; //end click (mousedown) or space/enter keydown
  }

  // mousedown and keydown events:
  action.event.preventDefault();
  let index = parseInt(action.event.target.dataset.cellnum);

  if (
    action.type === "mousedown" // select the clicked cell
  ) {
    // select cell
    newState.cellData = clearCellDisplay(newState.cellData);
    newState.cellData[index].focus = true;

    const jumbleData = {
      cellData: newState.cellData,
      selectedCell: index,
      solved: newState.solved,
      availableLetters: newState.availableLetters
    }
    crosswordMethods.saveCrosswordData(jumbleData, action.puzzleID, action.tableID);
    return jumbleData; //end click (mousedown) or space/enter keydown

  }
  
  if (action.type === "keydown") {

    const key = action.event.key;
    const keyCode = action.event.keyCode;
    
    if (keyCode >= 65 && keyCode <= 90) { //letter
      newState.cellData[index].cellValue = key;
      index = getNextLetterCellIndex(newState, index);
    } 
    
    else if (keyCode === 8 || keyCode === 46) { //backspace/delete
      if (newState.cellData[index].cellValue === "") { // if already blank, get prev cell
        index = getPrevLetterCellIndex(state, index, true);
      }
      newState.cellData[index].cellValue = "";
    } //end backspace/delete

    else if (keyCode === 32) { //space button
      newState.cellData[index].cellValue = ""; // clear out cell currently on
      index = getNextLetterCellIndex(state, index, true); // go to next cell
    }

    else if ((keyCode === 9 && !action.event.shiftKey) || keyCode === 39) { //tab or right arrow
      index = getNextLetterCellIndex(state, index);
    }

    else if ((keyCode === 9 && action.event.shiftKey) || keyCode === 37) { //shift-tab or left arrow
      index = getPrevLetterCellIndex(state, index);
    }

    // for all keydowns, update focus, refigure used available letters, save, and return new state
    newState.cellData = clearCellDisplay(newState.cellData); // remove current focus
    newState.cellData[index].focus = true; // set new focus
    newState = markAvailableLettersAsUsed(newState);

    const jumbleData = {
      cellData: newState.cellData,
      selectedCell: newState.selectedCell,
      solved: newState.solved,
      availableLetters: newState.availableLetters
    }
    crosswordMethods.saveCrosswordData(jumbleData, action.puzzleID, action.tableID);
    return jumbleData;

  //end action.type === "keydown"
  } else { 
    throw new Error();
  }

}; //end reducer


const Jumble = (props) => {
  const { puzzleID, tableID, initialCellData, questionText, altText, answerText, availableLetters } =
    props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {

    const storedCrosswordData = crosswordMethods.loadCrosswordData(puzzleID, tableID);
    if (storedCrosswordData !== null) { //was there data saved to browser for this puzzle?
      dispatch({ type: "loadStateFromStorage", storedCrosswordData, puzzleID, tableID });
    } else
      dispatch({ type: "setData", initialCellData, availableLetters, puzzleID, tableID });
  }, [initialCellData, availableLetters, puzzleID, tableID]);


  const onKeyDownHandler = (event) => {
    dispatch({ type: "keydown", event, answerText, puzzleID, tableID });
  };

  const onMouseDownHandler = (event) => {
    dispatch({ type: "mousedown", event, puzzleID, tableID });
  };

  const onRefreshHandler = (event) => {
    dispatch({type: "shuffleAvailableLetters", puzzleID, tableID})
  }

  return (
    <div className="jumble-outer-div">
      <img
        src={require("../../assets/crosswordcat.jpg").default}
        alt={altText}
        className="jumble-img"
      />
      <div className="jumble-card-div">
        <Card className="dark jumble-question">
          <div>{questionText}</div>
        </Card>
      </div>

      <div className="answer-blanks">
        {state.cellData.map((cell, i) => {
          switch (cell.type) {
            case "letter":
              return <JumbleCell
                key={i}
                focus={state.cellData[i].focus}
                cellValue={state.cellData[i].cellValue}
                data-cellnum={state.cellData[i].index}
                onKeyDown={onKeyDownHandler}
                onMouseDown={onMouseDownHandler}
              />
            case "space":
              return <div key={i} className="answer-word-break"></div>
            default:
              return <div key={i} className="answer-other-char">{cell.cellValue}</div>
          }
        })}

      </div>

      <div className="jumble-card-div">
        <Card className="dark available-jumble-letters">
          {state.availableLetters.map((letter, i) => {
            return <div key={i} className={`available-jumble-letter${letter.usedInGuess ? " available-jumble-used" : ""}`}>{letter.letter.toUpperCase()}</div>
          })}
          <img
            src={require("../../assets/icon-refresh.png").default}
            alt="refresh"
            className="jumble-refresh"
            onClick={onRefreshHandler}
          />
        </Card>

      </div>
    </div>
  );
};

export default Jumble;
