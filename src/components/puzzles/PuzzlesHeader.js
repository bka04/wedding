import Button from "../UI/Button";

const PuzzlesHeader = (props) => {

  return (
    <div className='dark nextTableDiv'>
      <Button className="prevTableBtn" onClick={props.onPrevTable}>
        Previous Table
      </Button>
      <h4 className="tableNum">Table {props.table}</h4>
      <Button className="nextTableBtn" onClick={props.onNextTable}>
        Next Table
      </Button>
    </div>
  );
};

export default PuzzlesHeader;
