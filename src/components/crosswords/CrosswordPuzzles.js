const PUZZLES = [
  {
    id: "1",
    answerText: 'reactarguepairsisletdeeds',
    acrossClues: [
      { number: 1, text: "Respond.  Also a popular JavaScript framework" },
      { number: 6, text: "Debate" },
      { number: 7, text: "These are worth two points in cribbage" },
      { number: 8, text: "Florida Keys, e.g." },
      { number: 9, text: "Home ownership documents" }
    ],
    downClues: [
      { number: 1, text: "With 5 down, same day COVID exams" },
      { number: 2, text: "Remove" },
      { number: 3, text: "Popular software development approach" },
      { number: 4, text: "Healed" },
      { number: 5, text: "See 1 down" }
    ]
  },
  {
    id: "2",
    answerText: 'glad shawauge purebloc agessugarcoat   doe   sweettalkiran icondisc minestye edge',
    acrossClues: [
      { number: 1, text: "Happy" },
      { number: 5, text: "Manchester United defender Luke" },
      { number: 9, text: "Telephus's mother in mythology" },
      { number: 10, text: "Free from contaminant" },
      { number: 11, text: "Voting or country group" },
      { number: 12, text: "Board game specification" },
      { number: 13, text: "Garment of gumdrops?" },
      { number: 15, text: "Jane or John" },
      { number: 16, text: "Lecture on lollipops?" },
      { number: 22, text: "Iraq neighbor" },
      { number: 23, text: "Desktop shortcut" },
      { number: 24, text: "Word preceding golf or jockey" },
      { number: 25, text: "Not yours" },
      { number: 26, text: "Eyelid lump" },
      { number: 27, text: "Microsoft's web browser" }
    ],
    downClues: [
      { number: 1, text: "Jabbers" },
      { number: 2, text: "Athleisure giant, colloquially" },
      { number: 3, text: "Les Miserables song ABC Cafe/Red and Black: 'I am ___! I am aghast! Is Marius in love at last?'" },
      { number: 4, text: "Luxurious self-indulgence" },
      { number: 5, text: "Four-dimensional continuum" },
      { number: 6, text: "Les Miserables author" },
      { number: 7, text: "Pi * r-squared for a circle" },
      { number: 8, text: "Columbus's voyage direction" },
      { number: 14, text: "Decay" },
      { number: 16, text: "Crib death" },
      { number: 17, text: "___ of habeas corpus" },
      { number: 18, text: "Not hard" },
      { number: 19, text: "Base counterpart" },
      { number: 20, text: "Like Rip Van Winkle's slumber or Gandalf's beard" },
      { number: 21, text: "It's slapped in laughter" }
    ]
  },
  {
    id: "3",
    answerText: 'set   tagpain saleecru ironcheckmate   lip   queensideurdu odinages nerdden   ats',
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
      { number: 26, text: "Alphabet position after R" }
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
      { number: 20, text: "Burnt at a barbeque" }
    ]
  }
]



for (let i = 0; i < PUZZLES.length; i++) {
  //split out the answer string into an array of letters
  PUZZLES[i].answers = PUZZLES[i].answerText.split('').map(letter => letter.replace(' ', ''));

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
  
    if (PUZZLES[i].answers[j] === '') {
      disabled = true;
    }
  
    PUZZLES[i].cellData.push({
      id: j+1,
      disabled,
      focus,
      value: "",
      locked,
      wrong
    });
  }
}


export default PUZZLES;