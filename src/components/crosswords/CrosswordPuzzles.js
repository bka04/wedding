const PUZZLES = [
  {
    table: "1",
    id: "1",
    type: "crossword",
    answerText:    "boarduppernervecrieshalls",
    usedForJumble: " x        x  x   x     x ",
    acrossClues: [
      { number: 1, text: "Games type" },
      { number: 6, text: "Word with classmen or cut" },
      { number: 7, text: "___-racking" },
      { number: 8, text: "Bawls" },
      { number: 9, text: "These can be decked" },
    ],
    downClues: [
      { number: 1, text: "Grapes group" },
      { number: 2, text: "Phantom of the ___" },
      { number: 3, text: "Erin and Brent's wedding month" },
      { number: 4, text: "Enjoy in a lively way" },
      { number: 5, text: "Erin's attire" },
    ],
  },
  {
    table: "1",
    id: "2",
    type: "crossword",
    answerText:
      "macawidahosobertriadsends",
    usedForJumble:
      " x       x   x x         ",
    acrossClues: [
      { number: 1, text: "Tropical parrot" },
      { number: 6, text: "State sometimes confused with Iowa" },
      { number: 7, text: "Not drunk" },
      { number: 8, text: "Group of three connected things" },
      { number: 9, text: "Transmits electronically" },
    ],
    downClues: [
      { number: 1, text: "Sprays" },
      { number: 2, text: "Love" },
      { number: 3, text: "___ in the Woods" },
      { number: 4, text: "In the lead" },
      { number: 5, text: "What Brent and Erin like to play with" },
    ],
  },
  {
    table: "1",
    id: "3",
    type: "jumble",
    questionText:
      "The bride misplaced part of her wedding outfit. She searched everywhere, but it was",
    altText: "A bride is searching for something but has to give up.",
    answerText: "to no a-veil",
    answerTextLetters: "tonoaveil"
  },
  {
    table: "2",
    id: "1",
    type: "crossword",
    answerText:    "wheathelloiliadtetraenemy",
    usedForJumble: "   x     x x   x   x     ",
    acrossClues: [
      { number: 1, text: "Celiac's nemesis" },
      { number: 6, text: "Adele's lyric, '___, can you hear me?'" },
      { number: 7, text: "Homer's masterpiece" },
      { number: 8, text: "Hedron prefix" },
      { number: 9, text: "Adversary" },
    ],
    downClues: [
      { number: 1, text: "Erin's color" },
      { number: 2, text: "___ of Troy" },
      { number: 3, text: "Select few" },
      { number: 4, text: "Morning buzz" },
      { number: 5, text: "When Erin and Brent got married" },
    ],
  },
  {
    table: "2",
    id: "2",
    type: "crossword",
    answerText:    " idosscarphingeincanagent",
    usedForJumble: " x      x   x    x  x   x",
    acrossClues: [
      { number: 1, text: "Wedding vows" },
      { number: 5, text: "Very steep slope" },
      { number: 6, text: "Dating app" },
      { number: 7, text: "Ancient Peruvian" },
      { number: 8, text: "Word with secret or orange" },
    ],
    downClues: [
      { number: 1, text: "Cake topper" },
      { number: 2, text: "Newlyweds' first ___" },
      { number: 3, text: "Church instrument" },
      { number: 4, text: "How the newlyweds feel, or the status of their budget, at the end of their wedding weekend" },
      { number: 5, text: "Holes actor LaBeouf" },
    ],
  },
  {
    table: "2",
    id: "3",
    type: "jumble",
    questionText:
      "What the bride and groom got into at their destination wedding: An",
    altText: "A bride and groom are about to be married on a beach and are arguing.",
    answerText: "atlar-cation",
    answerTextLetters: "altarcation"
  },
];

class JumbleCellData {
  constructor(index) {
    this.index = index;
    this.cellValue = "";
    this.type = "";
    this.focus = false;
    // this.locked = false;
    // this.wrong = false;
  }
}

for (let i = 0; i < PUZZLES.length; i++) {
  if (PUZZLES[i].type === "crossword") {
    //split out the answer string into an array of letters
    PUZZLES[i].answers = PUZZLES[i].answerText
      .split("")
      .map((letter) => letter.replace(" ", ""));

    //populate cell data based on the answers
    PUZZLES[i].cellData = [];
    for (let j = 0; j < PUZZLES[i].answers.length; j++) {
      let focus = false;
      if (j === 0) {
        focus = true;
      }

      let locked = false;
      let disabled = false;
      let wrong = false;
      let usedForJumble = false;

      if (PUZZLES[i].answers[j] === "") {
        disabled = true;
      }

      if (PUZZLES[i].usedForJumble[j] === "x") {
        usedForJumble = true;
      }

      PUZZLES[i].cellData.push({
        id: j + 1,
        disabled,
        focus,
        value: "",
        locked,
        wrong,
        usedForJumble
      });
    }
  } else if (PUZZLES[i].type === "jumble") {
    PUZZLES[i].cellData = [];

    for (let j = 0; j < PUZZLES[i].answerText.length; j++) {
      let cellData = new JumbleCellData(j);

      if (j === 0) {
        cellData.focus = true;
      }

      let letter = PUZZLES[i].answerText[j];
      if (letter.toLowerCase() !== letter.toUpperCase()) {
        //letter a-z
        cellData.type = "letter";
      } else if (letter === " ") {
        cellData.type = "space";
      } else {
        cellData.type = "other";
        cellData.cellValue = letter;
      }

      PUZZLES[i].cellData.push(cellData);
    }
  }
}

export default PUZZLES;
