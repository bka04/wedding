// const exampleAllCrosswordsData = [
//   {
//     table: "1", -- will need to add
//     id: "1",
//     crosswordData: {}
//   }, 
//   {
//     table: "1",
//     id: "2",
//     crosswordData: {}
//   },
//   {
//     table: "1",
//     id: "3",
//     jumbleData: {}
//   },
//   {
//     table: "2",
//     id: "1",
//     crosswordData: {}
//   }
// ]

import PUZZLES from "./CrosswordPuzzles";

const crosswordMethods = {

  saveCrosswordData: (crosswordData, puzzleID, tableID) => {
    let allCrosswordsData = crosswordMethods.loadAllCrosswordsData();
    let foundPuzzle = allCrosswordsData.find(puzzle => (puzzle.id === puzzleID) && (puzzle.table === tableID));
    if (foundPuzzle) {
      foundPuzzle.crosswordData = crosswordData;
    } else {
      allCrosswordsData.push({
        id: puzzleID,
        table: tableID,
        crosswordData: crosswordData
      })
    }
    localStorage.setItem("allCrosswordsData", JSON.stringify(allCrosswordsData));
  },

  loadAllCrosswordsData: () => {
    const allCrosswordsData = JSON.parse(localStorage.getItem("allCrosswordsData")); //get data saved to browswer
    return allCrosswordsData ? allCrosswordsData : [];
  },

  loadCrosswordData: (puzzleID, tableID) => {
    const allCrosswordsData = crosswordMethods.loadAllCrosswordsData();
    const foundPuzzle = allCrosswordsData.find(puzzle => (puzzle.id === puzzleID) && (puzzle.table === tableID));
    return foundPuzzle ? foundPuzzle.crosswordData : null;
  },

  removeCrosswordData: (puzzleID, tableID) => {
    const allCrosswordsData = crosswordMethods.loadAllCrosswordsData();
    let foundIndex = allCrosswordsData.findIndex(puzzle => (puzzle.id === puzzleID) && (puzzle.table === tableID));
    if (foundIndex >= 0) {
      allCrosswordsData.splice(foundIndex, 1);
      localStorage.setItem("allCrosswordsData", JSON.stringify(allCrosswordsData));
    }
  },

  //takes the puzzle and table ID of the jumble and returns letters entered in the crossword that are for the jumble
  //then checks the jumble to see if there are more letters needed. If so, fills in underscores
  getJumbleAvailableLettersFromCrosswords: (tableID, puzzleID) => {
    const allCrosswordsData = crosswordMethods.loadAllCrosswordsData();
    const puzzlesForTable = allCrosswordsData.filter(puzzle => (puzzle.table === tableID));
    let availableLetters = [];
    puzzlesForTable.forEach(puzzle => {
      availableLetters = availableLetters.concat(
        puzzle.crosswordData.cellData.filter(cellData => cellData.usedForJumble && cellData.value !== "").map(cell => cell.value)
      );
    })
    const answerLength = PUZZLES.find(puzzle => (puzzle.id === puzzleID && puzzle.table === tableID)).answerTextLetters.length;

    while (availableLetters.length < answerLength){
      availableLetters.push("_")
    }
    return availableLetters;
  },

  //Populate the across and down question numbers for each cell
  //Also determine which cells need to display a question number
  populateNumbers: (data) => {
    const COLS = Math.sqrt(data.length);

    const newDownWord = (i) => {
      if (i - COLS < 0) {
        return true; //top row will have new numbers
      }
      if (data[i - COLS].disabled) {
        return true; //if cell above is disabled, need new number
      }
      return false;
    }; //end newDownWord

    const newAcrossWord = (i) => {
      if (i - 1 < 0) {
        return true; //first cell needs new number
      }
      if (i % COLS === 0) {
        return true; //first column needs new numbers
      }
      if (data[i - 1].disabled) {
        return true; //if cell to the left is disabled, need new number
      }
      return false;
    }; //end newAcrossWord

    let questionNum = 0;

    for (let i = 0; i < data.length; i++) {
      data[i].questionNumberDisplayed = 0;

      if (data[i].disabled) {
        continue;
      }

      const newDown = newDownWord(i);
      const newAcross = newAcrossWord(i);

      if (newDown || newAcross) {
        questionNum++;
        data[i].questionNumberDisplayed = questionNum; //Set number to be displayed in cell
      }

      if (newDown) {
        data[i].questionNumberDown = questionNum; //New down number
      } else {
        data[i].questionNumberDown = data[i - COLS].questionNumberDown; //Get down number for cell above
      }
      if (newAcross) {
        data[i].questionNumberAcross = questionNum; //New across number
      } else {
        data[i].questionNumberAcross = data[i - 1].questionNumberAcross; //Get down number for cell to the left
      }
    }

    return data;
  }, //end populateNumbers

  updateHighlighting: (state, index) => {
    const questionNumberProp = state.across
      ? "questionNumberAcross"
      : "questionNumberDown";
    const currentQuestion = state.cellData[index][questionNumberProp];

    state.cellData.forEach((el, index) => {
      if (el[questionNumberProp] === currentQuestion) {
        state.cellData[index].highlight = true;
      }
    });

    return state.cellData;
  },

  //reset highlight and focus for all cells
  clearCellDisplay: (cellData) => {
    return cellData.map((cell) => ({
      ...cell,
      highlight: false,
      focus: false,
    }));
  },

  clearCellValues: (cellData) => {
    return cellData.map((cell) => ({
      ...cell,
      value: ''
    }));
  },

  getNextCell: (state, index, directionOverride = "") => {
    const TOTALCELLS = Math.pow(state.cols, 2);
    if (
      (state.across || directionOverride === "across") &&
      directionOverride !== "down"
    ) {
      index++;
      if (index === TOTALCELLS) {
        index = 0;
      }
      while (index < TOTALCELLS) {
        if (!state.cellData[index].disabled) {
          break;
        }
        index++;
        if (index === TOTALCELLS - 1) {
          index = 0;
        }
      }
    } else {
      //down
      index += state.cols;
      if (index === TOTALCELLS - 1 + state.cols) {
        index = 0;
      } else if (index > TOTALCELLS - 1) {
        index -= TOTALCELLS - 1;
      }
      while (index < TOTALCELLS) {
        if (!state.cellData[index].disabled) {
          break;
        }
        index += state.cols;
        if (index > TOTALCELLS - 1) {
          index -= TOTALCELLS - 1;
        }
      }
    }
    return index;
  },

  getPrevCell: (state, index, directionOverride = "") => {
    const TOTALCELLS = Math.pow(state.cols, 2);
    if (
      (state.across || directionOverride === "across") &&
      directionOverride !== "down"
    ) {
      index--;
      if (index < 0) {
        index = TOTALCELLS - 1;
      }
      while (index >= 0) {
        if (!state.cellData[index].disabled) {
          break;
        }
        index--;
        if (index < 0) {
          index = TOTALCELLS - 1;
        }
      }
    } else {
      //down
      index -= state.cols;
      if (index === 0 - state.cols) {
        index = TOTALCELLS - 1;
      } else if (index < 0) {
        index += TOTALCELLS - 1;
      }
      while (index > 0) {
        if (!state.cellData[index].disabled) {
          break;
        }
        index -= state.cols;
        if (index < 0) {
          index += TOTALCELLS - 1;
        }
      }
    }
    return index;
  },

  getNextWord: (state, index) => {
    const questionNumberProp = state.across
    ? "questionNumberAcross"
    : "questionNumberDown";
    const currentQuestionNumber = state.cellData[index][questionNumberProp];

    const maxQuestionNumber = Math.max.apply(null, state.cellData.map(cell => cell[questionNumberProp] ? cell[questionNumberProp] : 0));
    
    if (currentQuestionNumber === maxQuestionNumber) { //if already at the highest down or across question number, get the lowest
      const minQuestionNumber = Math.min.apply(null, state.cellData.map(cell => cell[questionNumberProp] ? cell[questionNumberProp] : 999));
      return state.cellData.findIndex(x => x[questionNumberProp] === minQuestionNumber);
    }

    for (let q = currentQuestionNumber + 1; q <= maxQuestionNumber; q++) {
      const newIndex = state.cellData.findIndex(x => x[questionNumberProp] === q);
      if (newIndex > -1) {
        return newIndex; //return if valid. Otherwise, add 1 and try again.
      }
    }
  },

  getPrevWord: (state, index) => {
    const questionNumberProp = state.across
    ? "questionNumberAcross"
    : "questionNumberDown";
    const currentQuestionNumber = state.cellData[index][questionNumberProp];

    const minQuestionNumber = Math.min.apply(null, state.cellData.map(cell => cell[questionNumberProp] ? cell[questionNumberProp] : 999));
    
    if (currentQuestionNumber === minQuestionNumber) { //if already at the lowest down or across question number, get the highest
      const maxQuestionNumber = Math.max.apply(null, state.cellData.map(cell => cell[questionNumberProp] ? cell[questionNumberProp] : 0));
      return state.cellData.findIndex(x => x[questionNumberProp] === maxQuestionNumber);
    }

    for (let q = currentQuestionNumber - 1; q >= minQuestionNumber; q--) {
      const newIndex = state.cellData.findIndex(x => x[questionNumberProp] === q);
      if (newIndex > -1) {
        return newIndex; //return if valid. Otherwise, subtract 1 and try again.
      }
    }
  },

  getSelectedWord: (state) => {
    const direction = state.across ? "Across" : "Down"; //is across or down selected?
    const word = state.cellData.filter(cell => //get all data on this word
      cell[`questionNumber${direction}`] === 
      state.cellData[state.selectedCell - 1][`questionNumber${direction}`]
    );
    return word;
  },

  checkGridAgainstAnswers: (state, answers) => {
    const gridLetters = state.cellData.map(cell => cell.value); //get letters from screen
    return gridLetters.every((val, index) => val === answers[index]); //every letter correct?
  },

  handleSolvedGrid: (state) => {
    state.cellData = state.cellData.map((cell) => ({...cell, locked: true}));
    alert("Well solved, puzzler!");
    state.solved = true;
    return state;
  }

};

export default crosswordMethods;