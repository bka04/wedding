import "./CrosswordPowerUps.css";
import Button from "../UI/Button";
import Card from "../UI/Card"
import { Fragment, useState } from "react";

const icons = [
  { id: "verifyWord", imgId: "checkmark", text: "Verify Word" },
  { id: "revealRandomLetter", imgId: "die", text: "Reveal Random Letter" },
  { id: "revealLetter", imgId: "k", text: "Reveal Letter" },
  // {id: "revealLetterEverywhere", imgId: "buyLetter", text: "Reveal Letter Everywhere"},
  { id: "verifyGrid", imgId: "check", text: "Verify Grid" },
  { id: "revealWord", imgId: "word", text: "Reveal Word" },
];

const CrosswordPowerUps = (props) => {
  const [showAssistance, setShowAssistance] = useState(false);

  const toggleAssistance = () => {
    setShowAssistance(!showAssistance);
  };

  return (
    <Fragment>
      <Button className="resetBtn helpBtn" onClick={toggleAssistance}>
        {showAssistance ? "Hide Help Options" : "Show Help Options"}
      </Button>
      { showAssistance ? <PowerUps onClick={props.onClick}></PowerUps> : null}
    </Fragment>
  );
};

const PowerUps = (props) => {
  return (
    <Card className='dark'>
      <div className="crosswordPowerUps">
        {icons.map((icon) => (
          <div
            className="crosswordPowerUp"
            key={icon.id}
            id={icon.id}
            onClick={props.onClick}
          >
            <p>{icon.text}</p>
            <img
              src={require("../../assets/icon-" + icon.imgId + ".png").default}
              alt={icon.text}
              width="50"
              height="50"
            />

            {/* <span className='tooltiptext'>{icon.text}</span> */}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CrosswordPowerUps;
