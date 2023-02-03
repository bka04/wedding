import "./Jumble.css";
import { useReducer, useEffect } from "react";
import Card from "../UI/Card";
import JumbleCell from "./JumbleCell";
import crosswordMethods from "../crosswords/CrosswordMethods";

const initialState = {
  cellData: [],
  selectedCell: 0,
  solved: false
};

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


const reducer = (state, action) => {

  if (action.type === "loadStateFromStorage") {
    return action.storedCrosswordData;
  }
  if (action.type === "setData") {
    return {
      cellData: action.initialCellData,
      selectedCell: 0,
      solved: false
    };
  }

  let newState = {...state, cellData: state.cellData.slice()}; //to avoid directly mutating state
  
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
      solved: newState.solved
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

    // for all keydowns, update focus, save and return new state
    newState.cellData = clearCellDisplay(newState.cellData); // remove current focus
    newState.cellData[index].focus = true; // set new focus

    const jumbleData = {
      cellData: newState.cellData,
      selectedCell: newState.selectedCell,
      solved: newState.solved
    }
    crosswordMethods.saveCrosswordData(jumbleData, action.puzzleID, action.tableID);
    return jumbleData;

  //end action.type === "keydown"
  } else { 
    throw new Error();
  }

};

const Jumble = (props) => {
  const { puzzleID, tableID, initialCellData, questionText, altText, answerText } =
    props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {

    const storedCrosswordData = crosswordMethods.loadCrosswordData(puzzleID, tableID);
    if (storedCrosswordData !== null) { //was there data saved to browser for this puzzle?
      dispatch({ type: "loadStateFromStorage", storedCrosswordData });
    } else
      dispatch({ type: "setData", initialCellData, puzzleID, tableID });
  }, [initialCellData, puzzleID, tableID]);


  const onKeyDownHandler = (event) => {
    dispatch({ type: "keydown", event, answerText, puzzleID, tableID });
  };

  const onMouseDownHandler = (event) => {
    dispatch({ type: "mousedown", event, puzzleID, tableID });
  };

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
          <div className="available-jumble-letter">L</div>
          <div className="available-jumble-letter">E</div>
          <div className="available-jumble-letter">N</div>
          <div className="available-jumble-letter">T</div>
          <div className="available-jumble-letter">O</div>
          <div className="available-jumble-letter">V</div>
          <div className="available-jumble-letter">O</div>
          <div className="available-jumble-letter">I</div>
          <div className="available-jumble-letter">A</div>
          <img
            src={require("../../assets/icon-refresh.png").default}
            alt="refresh"
            className="jumble-refresh"
          />
        </Card>
        
      </div>
    </div>
  );
};

export default Jumble;
