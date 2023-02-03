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
    answerText:
      "set   tagpain saleecru ironcheckmate   lip   queensideurdu odinages nerdden   ats",
    usedForJumble:
      "                                                                                 ",
    acrossClues: [
      { number: 1, text: "Tennis scoring unit" },
      { number: 4, text: "Playground activity" },
      { number: 7, text: "Necessary for gain, according to Jane Fonda" },
      { number: 9, text: "What department store clothes are always on" },
      { number: 10, text: "Beige" },
      { number: 11, text: "Earth's core element" },
      { number: 12, text: "How an Australian asks for the bill?" },
      { number: 14, text: "Back talk" },
      { number: 15, text: "Half of a monarch's bed?" },
      { number: 21, text: "Language of Pakistan" },
      { number: 22, text: "Overseer of Valhalla" },
      { number: 23, text: "Periods" },
      { number: 24, text: "Jock's counterpart" },
      { number: 25, text: "Thieves' locale" },
      { number: 26, text: "Alphabet position after R" },
    ],
    downClues: [
      { number: 1, text: "Reqt." },
      { number: 2, text: "Sometimes seen on a 9-down 4-down" },
      { number: 3, text: "Bore" },
      { number: 4, text: "Lipinski or Reid" },
      { number: 5, text: "Heaps" },
      { number: 6, text: "Kelly who sang in the rain" },
      { number: 8, text: "Cell's central unit" },
      { number: 9, text: "Marge or Lisa" },
      { number: 13, text: "Next of ___" },
      { number: 15, text: "Nathan Chen's jump" },
      { number: 16, text: "Desire" },
      { number: 17, text: "Biblical garden" },
      { number: 18, text: "Lightbulb cause" },
      { number: 19, text: "Earth" },
      { number: 20, text: "Burnt at a barbeque" },
    ],
  },
  {
    table: "2",
    id: "2",
    type: "crossword",
    answerText:    "reactarguepairsisletdeeds",
    usedForJumble: "                         ",
    acrossClues: [
      { number: 1, text: "TESTING! Puzzle 2 of table 2" },
      { number: 6, text: "Debate" },
      { number: 7, text: "These are worth two points in cribbage" },
      { number: 8, text: "Florida Keys, e.g." },
      { number: 9, text: "Home ownership documents" },
    ],
    downClues: [
      { number: 1, text: "With 5 down, same day COVID exams" },
      { number: 2, text: "Remove" },
      { number: 3, text: "Popular software development approach" },
      { number: 4, text: "Healed" },
      { number: 5, text: "See 1 down" },
    ],
  },
  {
    table: "2",
    id: "3",
    type: "crossword",
    answerText:    "reactarguepairsisletdeeds",
    usedForJumble: "                         ",
    acrossClues: [
      { number: 1, text: "ANOTHER TEST. Table 2 puzzle 3" },
      { number: 6, text: "Debate" },
      { number: 7, text: "These are worth two points in cribbage" },
      { number: 8, text: "Florida Keys, e.g." },
      { number: 9, text: "Home ownership documents" },
    ],
    downClues: [
      { number: 1, text: "With 5 down, same day COVID exams" },
      { number: 2, text: "Remove" },
      { number: 3, text: "Popular software development approach" },
      { number: 4, text: "Healed" },
      { number: 5, text: "See 1 down" },
    ],
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
