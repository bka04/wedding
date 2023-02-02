import "./Jumble.css";
import { useReducer, useEffect } from "react";
import Card from "../UI/Card";
import JumbleCell from "./JumbleCell";


const initialState = {
  cellData: [],
  selectedCell: 0,
  solved: false
};

const reducer = (state, action) => {

  // if (action.type === "loadStateFromStorage") {
  //   return action.storedCrosswordData;
  // }
  if (action.type === "setData") {
    return {
      cellData: action.initialCellData,
      selectedCell: 0,
      solved: false
    };
  }

  let newState = {...state, cellData: state.cellData.slice()}; //to avoid directly mutating state


}

const Jumble = (props) => {
  const { puzzleID, tableID, initialCellData, questionText, altText, answerBlanks, answerText } =
    props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {

    const storedCrosswordData = null ; // crosswordMethods.loadCrosswordData(props.puzzleID, props.tableID);
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
                //cellValue={state.cellData[i].cellValue}
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
