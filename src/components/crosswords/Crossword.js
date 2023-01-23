import { Fragment, useEffect, useReducer } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import CrosswordClues from "./CrosswordClues";
import CrosswordGrid from "./CrosswordGrid";
// import CrosswordStatus from "./CrosswordStatus";
import CrosswordPowerUps from "./CrosswordPowerUps";
import './Crossword.css';
import CrosswordActiveClue from "./CrosswordActiveClue";
import crosswordMethods from "./CrosswordMethods";

const initialState = {
  cellData: [],
  selectedCell: 0,
  across: true,
  cols: 0,
  solved: false
};

const reducer = (state, action) => {
  if (action.type === "loadStateFromStorage") {
    return action.storedCrosswordData;
  }

  let newState = {...state, cellData: state.cellData.slice()}; //to avoid directly mutating state

  if (action.type === "setSolved") {
    const crosswordData = {
      cellData: newState.cellData,
      selectedCell: newState.selectedCell,
      across: newState.across,
      cols: newState.cols,
      solved: true
    };
    localStorage.setItem("crosswordData", JSON.stringify(crosswordData));
    return crosswordData;
  }

  if (action.type === "resetGrid") {
    localStorage.removeItem("crosswordData");
    newState.cellData = crosswordMethods.clearCellValues(action.initialCrosswordData);
    newState.cellData = crosswordMethods.populateNumbers(newState.cellData);
    newState.across = true;
    newState.cellData = crosswordMethods.updateHighlighting(newState, 0);
    return {
      cellData: newState.cellData,
      selectedCell: 1,
      across: true,
      cols: Math.sqrt(newState.cellData.length),
      solved: false
    };
  } //end resetGrid

  if (action.type === "selectCellFromClue") {

    newState.across = action.event.target.dataset.direction === 'Across' ? true : false;
    const index = newState.cellData.findIndex((cell) => 
      cell[`questionNumber${action.event.target.dataset.direction}`] === parseInt(action.event.target.dataset.questionNumber)
    );

    newState.cellData = crosswordMethods.clearCellDisplay(newState.cellData);
    newState.cellData[index].focus = true;
    newState.cellData = crosswordMethods.updateHighlighting(newState, index);
    
    const crosswordData = {
      cellData: newState.cellData,
      selectedCell: index + 1,
      across: newState.across,
      cols: newState.cols,
      solved: newState.solved
    };
    localStorage.setItem("crosswordData", JSON.stringify(crosswordData));
    return crosswordData;
  } //end selectCellFromClue

  if (action.type === "powerUp") {

    if (action.powerUp === "revealRandomLetter") {
      const incorrectLetters = newState.cellData.filter(cell => //filter for incorrect letters
        cell.value !== action.answers[cell.id - 1]
      );

      if (incorrectLetters.length > 0) { //any incorrect letters? get a random one and reveal
        const cellID = incorrectLetters[Math.floor(Math.random()*incorrectLetters.length)].id;
        newState.cellData[cellID - 1].value = action.answers[cellID - 1]; //set answer
        newState.cellData[cellID - 1].locked = true; //lock it
        newState.cellData[cellID - 1].wrong = false; //not wrong
        const solved = crosswordMethods.checkGridAgainstAnswers(newState, action.answers) //has grid been solved?
        if (solved) {
          newState = crosswordMethods.handleSolvedGrid(newState);
        }
      }
    }

    if (action.powerUp === "revealLetter" || action.powerUp === "revealWord") {
      
      let revealThis = []; //will be letter or word
      if (action.powerUp === "revealLetter") { 
        revealThis = newState.cellData.filter(cell => //selected letter
          cell.id === newState.cellData[newState.selectedCell - 1].id
        ); 
      } else {
        revealThis = crosswordMethods.getSelectedWord(newState); //selected word
      }

      revealThis.forEach(function(cell) {
        newState.cellData[cell.id - 1].value = action.answers[cell.id - 1]; //set answer
        newState.cellData[cell.id - 1].locked = true; //lock it
        newState.cellData[cell.id - 1].wrong = false; //not wrong
      });

      const solved = crosswordMethods.checkGridAgainstAnswers(newState, action.answers) //has grid been solved?
      if (solved) {
        newState = crosswordMethods.handleSolvedGrid(newState);
      }

    }

    if (action.powerUp === "verifyWord" || action.powerUp === "verifyGrid") {

      let verifyThis = []; //will be word or entire grid
      if (action.powerUp === "verifyWord") {
        verifyThis = crosswordMethods.getSelectedWord(newState); //selected word
      } else {
        verifyThis = newState.cellData; //entire grid
      }

      verifyThis.forEach(function(cell) {
        //check what was entered vs the answer
        let correct = (newState.cellData[cell.id - 1].value === action.answers[cell.id - 1]);
        if (correct) { //is letter entered correct?
          newState.cellData[cell.id - 1].locked = true; //set locked to true
        } else {
          newState.cellData[cell.id - 1].wrong = true; //set wrong to true
        }
      });
    }

    const crosswordData = {
      cellData: newState.cellData,
      selectedCell: newState.selectedCell,
      across: newState.across,
      cols: newState.cols,
      solved: newState.solved
    };
    localStorage.setItem("crosswordData", JSON.stringify(crosswordData));
    return crosswordData;
  } //end powerUp

  action.event.preventDefault();
  const cellNum = parseInt(action.event.target.dataset.cellnum);
  let index = cellNum - 1;

  if (
    action.type === "mousedown" ||
    (action.type === "keydown" &&
      (action.event.keyCode === 13 || action.event.keyCode === 32)) //space/enter
  ) {
    if (cellNum === newState.selectedCell) {
      newState.across = !newState.across;
    }

    newState.cellData = crosswordMethods.clearCellDisplay(newState.cellData);
    newState.cellData[index].focus = true;
    newState.cellData = crosswordMethods.updateHighlighting(newState, index);

    const crosswordData = {
      cellData: newState.cellData,
      selectedCell: cellNum,
      across: newState.across,
      cols: newState.cols,
      solved: newState.solved
    };
    localStorage.setItem("crosswordData", JSON.stringify(crosswordData));
    return crosswordData; //end click (mousedown) or space/enter keydown
  } else if (action.type === "keydown") {
    if (action.event.keyCode === 8 || action.event.keyCode === 46) {
      //backspace/delete
      if (newState.cellData[index].value === "" || newState.cellData[index].locked) { //if blank or locked, get the previous cell
        index = crosswordMethods.getPrevCell(newState, index);
        newState.cellData = crosswordMethods.clearCellDisplay(newState.cellData);
        newState.cellData[index].focus = true;
        newState.cellData = crosswordMethods.updateHighlighting(newState, index);
      }      
       //handle backspace/delete
      if (!newState.cellData[index].locked) { //if locked, don't delete anything!
        newState.cellData[index].value = "";
        newState.cellData[index].wrong = false;
      }

      const crosswordData = {
        cellData: newState.cellData,
        selectedCell: index + 1,
        across: newState.across,
        cols: newState.cols,
        solved: newState.solved
      };
      localStorage.setItem("crosswordData", JSON.stringify(crosswordData));
      return crosswordData;        
      
    } //end backspace/delete

    if (
      (action.event.keyCode < 65 || action.event.keyCode > 90) && //not a letter
      action.event.keyCode !== 9 && //not tab
      (action.event.keyCode < 37 || action.event.keyCode > 40) //not left/up/right/down
    ) {
      //not a valid input; return without any changes
      const crosswordData = {
        cellData: newState.cellData,
        selectedCell: newState.selectedCell,
        across: newState.across,
        cols: newState.cols,
        solved: newState.solved
      };
      localStorage.setItem("crosswordData", JSON.stringify(crosswordData));
      return crosswordData;
    }

    let solved = false;
    if (
      action.event.keyCode !== 9 && //not tab
      (action.event.keyCode < 37 || action.event.keyCode > 40) //not left/up/right/down
    ) {
      //a letter was entered; set to keypress if the letter changed and is not locked; check if solved
      if (!newState.cellData[index].locked && newState.cellData[index].value !== action.event.key) {
        newState.cellData[index].value = action.event.key; //set entered letter
        newState.cellData[index].wrong = false; //clear out any 'wrong' line-through
        solved = crosswordMethods.checkGridAgainstAnswers(newState, action.answers) //has grid been solved?
        if (solved) { //if so, lock all letters in grid and alert user of great success
          newState = crosswordMethods.handleSolvedGrid(newState);
        }
      }
    }

    newState.cellData = crosswordMethods.clearCellDisplay(newState.cellData);

    switch (action.event.keyCode) {
      case 37: //left arrow
        index = crosswordMethods.getPrevCell(newState, index, "across");
        break;
      case 38: //up arrow
        index = crosswordMethods.getPrevCell(newState, index, "down");
        break;
      case 39: //right arrow
        index = crosswordMethods.getNextCell(newState, index, "across");
        break;
      case 40: //down arrow
        index = crosswordMethods.getNextCell(newState, index, "down");
        break;
      case 9: //tab
        if (action.event.shiftKey) {
          index = crosswordMethods.getPrevWord(newState, index)
        } else {
          index = crosswordMethods.getNextWord(newState, index);
        }
        break;
      default: //letter
        if (!solved) {
          index = crosswordMethods.getNextCell(newState, index);
        }
    }

    newState.cellData[index].focus = true;
    newState.cellData = crosswordMethods.updateHighlighting(newState, index); 


    const crosswordData = {
      cellData: newState.cellData,
      selectedCell: index + 1,
      across: newState.across,
      cols: newState.cols,
      solved: newState.solved
    };
    localStorage.setItem("crosswordData", JSON.stringify(crosswordData));

    return crosswordData; //end keydown
  } else {
    throw new Error();
  }
};


const Crossword = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedCrosswordData = JSON.parse(
      localStorage.getItem("crosswordData") //get data saved to browswer
    );

    if (storedCrosswordData !== null) { //was there data saved to browser?
      dispatch({ type: "loadStateFromStorage", storedCrosswordData });
    } else {
      dispatch({ type: "resetGrid", initialCrosswordData: props.initialCrosswordData });
    }
  }, [props.initialCrosswordData]);

  const onKeyDownHandler = (event) => {
    dispatch({ type: "keydown", event, answers: props.answers });
  };

  const onMouseDownHandler = (event) => {
    dispatch({ type: "mousedown", event });
  };

  const clueOnClickHandler = (event) => {
    dispatch({ type: "selectCellFromClue", event });
  };

  const powerUpOnClickHandler = (event) => {
    switch(event.target.id) {
      case "verifyWord":
        dispatch({type: "powerUp", powerUp: "verifyWord", event, answers: props.answers});
        break;
      case "revealRandomLetter":
        dispatch({type: "powerUp", powerUp: "revealRandomLetter", event, answers: props.answers});  
        break;
      case "revealLetter":
        dispatch({type: "powerUp", powerUp: "revealLetter", event, answers: props.answers});
        break;
      // case "revealLetterEverywhere":
      //   dispatch({type: "powerUp", powerUp: "revealLetterEverywhere", event, answers: props.answers});
      //   break;
      case "verifyGrid":
        dispatch({type: "powerUp", powerUp: "verifyGrid", event, answers: props.answers});
        break;
      case "revealWord":
        dispatch({type: "powerUp", powerUp: "revealWord", event, answers: props.answers});
        break;
      default:
        break;  
    }

  }

  const resetGrid = (event) => {
    if (window.confirm("Are you sure you want to reset the puzzle?")) {
      dispatch({ type: "resetGrid", initialCrosswordData: props.initialCrosswordData });
    }
  };

  const startOver = () => {
    if (window.confirm("Are you sure you want to clear all progress and start over on the first puzzle?")) {
      dispatch({ type: "resetGrid", initialCrosswordData: props.initialCrosswordData });
      props.onStartOver();
    }
  }

  const getSelectedQuestionNumber = (state, direction) => {
    const index = state.cellData.findIndex((cell) => cell.id === state.selectedCell);
    return (index > -1) ? state.cellData[index][`questionNumber${direction}`] : 1;

  };

  const getSelectedQuestionText = (number, direction) => {
    if (direction === 'Across') {
      const index = props.acrossClues.findIndex((clue) => clue.number === number);
      return (index > -1) ? props.acrossClues[index].text : '';
    } else {
      const index = props.downClues.findIndex((clue) => clue.number === number);
      return (index > -1) ? props.downClues[index].text : '';
    }
  }

  const nextPuzzleHandler = () => {
    dispatch({ type: "setSolved" });
    dispatch({ type: "resetGrid", initialCrosswordData: props.initialCrosswordData });
    props.onNextPuzzle();
  }

  return (
    <Fragment>
      {/* <Card className='dark'>
        <CrosswordStatus />
      </Card> */}
      <Card className='dark'>
        <CrosswordPowerUps 
          onClick={powerUpOnClickHandler}
        />
      </Card>
      {state.solved && !props.isThisLastPuzzle ? <div className='dark nextPuzzleDiv'><Button className="nextPuzzleBtn" onClick={nextPuzzleHandler}>
            Next Puzzle</Button></div> : null
      }
      <div className={`crosswordContent ${state.cols > 5 ? 'mediumGrid' : 'smallGrid'}`}>
        <Card className='dark crosswordCluesCard'>
          <CrosswordClues 
            onClick={clueOnClickHandler}
            clueDirection='Across' 
            clues={props.acrossClues}
            selectedDirection={state.across ? 'Across' : 'Down'}
            selectedQuestion={getSelectedQuestionNumber(state, 'Across')}
          />
        </Card>
        <Card className={`dark crosswordGridCard ${state.cols > 5 ? 'mediumGrid' : 'smallGrid'}`}>
          <CrosswordGrid
            cellData={state.cellData}
            cols={state.cols}
            onKeyDown={onKeyDownHandler}
            onMouseDown={onMouseDownHandler}
          />
          <CrosswordActiveClue 
            text={getSelectedQuestionText(
              getSelectedQuestionNumber(state, `${state.across ? 'Across' : 'Down'}`),
              `${state.across ? 'Across' : 'Down'}`)} 
          />
        </Card>
        <Card className='dark crosswordCluesCard'>
          <CrosswordClues 
            onClick={clueOnClickHandler}
            clueDirection='Down' 
            clues={props.downClues}
            selectedDirection={state.across ? 'Across' : 'Down'}
            selectedQuestion={getSelectedQuestionNumber(state, 'Down')}
          />
        </Card>
      </div>
      <div className='crosswordFooter'>
        <Button className="resetBtn" onClick={resetGrid}>
          Reset Current Puzzle
        </Button>
        <Button className="resetBtn" onClick={startOver}>
          Start Over From 1st Puzzle
        </Button>
        <div>
          <p>Game icons made by Freepik from www.flaticon.com</p>
        </div>
      </div>
    </Fragment>
  );
};

export default Crossword;
