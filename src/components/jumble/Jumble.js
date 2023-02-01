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
        <div type="letter" data="A">
          <Card className="jumble-tile">A</Card>
        </div>
        <div type="letter" data="B">
        <Card className="jumble-tile">B</Card>
        </div>

        <JumbleCell/>
        <JumbleCell/>
    </div>
  );
};

export default Jumble;
