import "./Jumble.css";
import { Fragment } from "react";
import Card from "../UI/Card";

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

        <div type="letter" data="_">
          <div types={["letter"]} onDrop={handleDrop}>
            <div>_</div>
          </div>
        </div>
        <div types={["letter"]} onDrop={handleDrop}>
          <div>_</div>
        </div>
    </div>
  );
};

export default Jumble;
