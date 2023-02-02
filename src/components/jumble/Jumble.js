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

const getNextLetterCellIndex = (state, index) => {
  const letterCells = state.cellData.filter(cell => cell.type === "letter");
  letterCells.sort((a, b) => a.index - b.index);
  const letterCellIndex = letterCells.findIndex(cell => cell.index === index);
  return letterCells[letterCellIndex + 1] ? letterCells[letterCellIndex + 1].index : letterCells[0].index;
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
    action.type === "mousedown" ||
    (action.type === "keydown" &&
      (action.event.keyCode === 13 || action.event.keyCode === 32)) //space/enter
  ) {
    // select next cell
    const jumbleData = {
      cellData: newState.cellData,
      selectedCell: getNextLetterCellIndex(newState, index),
      solved: newState.solved
    }
    crosswordMethods.saveCrosswordData(jumbleData, action.puzzleID, action.tableID);
    return jumbleData;

  } else if (action.type === "keydown") {
    if (action.event.keyCode === 8 || action.event.keyCode === 46) { //backspace/delete

      // clear cell and go to previous one
      //crosswordMethods.saveCrosswordData(jumbleData, action.puzzleID, action.tableID)
      //return 
    } //end backspace/delete

    if (
      (action.event.keyCode < 65 || action.event.keyCode > 90) && //not a letter
      action.event.keyCode !== 9 && //not tab
      (action.event.keyCode < 37 || action.event.keyCode > 40) //not left/up/right/down
    ) {
      //not a valid input; return without any changes
      const jumbleData = {
        cellData: newState.cellData,
        selectedCell: newState.selectedCell,
        solved: newState.solved
      }
      crosswordMethods.saveCrosswordData(jumbleData, action.puzzleID, action.tableID);
      return jumbleData;
    }

    //let solved = false;
    if (
      action.event.keyCode !== 9 && //not tab
      (action.event.keyCode < 37 || action.event.keyCode > 40) //not left/up/right/down
    ) {
      //a letter was entered; set to keypress if the letter changed and is not locked; check if solved
      if (!newState.cellData[index].locked && newState.cellData[index].cellValue !== action.event.key) {
        newState.cellData[index].cellValue = action.event.key; //set entered letter
        // newState.cellData[index].wrong = false; //clear out any 'wrong' line-through
        // solved = crosswordMethods.checkGridAgainstAnswers(newState, action.answers) //has grid been solved?
        // if (solved) { //if so, lock all letters in grid and alert user of great success
        //   newState = crosswordMethods.handleSolvedGrid(newState);
        // }
        index = getNextLetterCellIndex(newState, index);
      }
    }

    newState.cellData[index].focus = true;

    const jumbleData = {
      cellData: newState.cellData,
      selectedCell: index,
      solved: newState.solved
    }
    crosswordMethods.saveCrosswordData(jumbleData, action.puzzleID, action.tableID);
    return jumbleData;
  } else {
    throw new Error();
  }

};

const Jumble = (props) => {
  const { puzzleID, tableID, initialCellData, questionText, altText, answerBlanks, answerText } =
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
        </Card>
      </div>
    </div>
  );
};

export default Jumble;
