import "./CrosswordPowerUps.css";

const icons = [
  {id: "verifyWord", imgId: "checkmark", text: "Verify Word"},
  {id: "revealRandomLetter", imgId: "die", text: "Reveal Random Letter"},
  {id: "revealLetter", imgId: "k", text: "Reveal Letter"},
  // {id: "revealLetterEverywhere", imgId: "buyLetter", text: "Reveal Letter Everywhere"},
  {id: "verifyGrid", imgId: "check", text: "Verify Grid"},
  {id: "revealWord", imgId: "word", text: "Reveal Word"}
];

const crosswordPowerUps = (props) => {
  return (
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
  )
}

export default crosswordPowerUps;