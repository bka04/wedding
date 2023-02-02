import "./Jumble.css";
import { Fragment } from "react";
import Card from "../UI/Card";
import JumbleCell from "./JumbleCell"

const Jumble = (props) => {
  const {puzzleID, tableID, questionText, altText, answerBlanks, answerText} = props;

  const handleDrop = (data, event) => {
    console.log(data);
    console.log(event);
  }

  return (
    <div className="jumble-outer-div">
        <img
          src={require("../../assets/crosswordcat.jpg").default}
          alt={altText}
          className="jumble-img"
        />
        <Card className="available-jumble-letters dark">
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

        <div className="answer-blanks">
          <JumbleCell/>
          <JumbleCell/>
          <div className="answer-word-break"></div>
          <JumbleCell/>
          <JumbleCell/>
          <div className="answer-word-break"></div>
          <JumbleCell/>
          <div className="answer-other-char">-</div>
          <JumbleCell/>
          <JumbleCell/>
          <JumbleCell/>
          <JumbleCell/>
        </div>
    </div>
  );
};

export default Jumble;
