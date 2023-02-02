import "./Jumble.css";
import { Fragment } from "react";
import Card from "../UI/Card";
import JumbleCell from "./JumbleCell";

class JumbleCellData {
  constructor(index) {
    this.index = index;
    this.value = "";
    this.focus = false;
    // this.locked = false;
    // this.wrong = false;
  }
}

const initialState = {
  cellData: [],
  selectedCell: 0,
  solved: false
};


const Jumble = (props) => {
  const { puzzleID, tableID, questionText, altText, answerBlanks, answerText } =
    props;

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
        {answerBlanks.split("").map(letter => {
          switch (letter) {
            case "_":
              return <JumbleCell />
            case " ":
              return <div className="answer-word-break"></div>
            default:
              return <div className="answer-other-char">{letter}</div>
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
