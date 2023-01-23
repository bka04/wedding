import "./CrosswordGrid.css";
import CrosswordCell from "./CrosswordCell";

const CrosswordGrid = (props) => {

  const style = {'gridTemplateRows': `repeat(${props.cols}, 40px)`,
  'gridTemplateColumns': `repeat(${props.cols}, 40px)`}

  return (
  <div className="crosswordGrid" style={style}>
    {props.cellData.map((cell) => (
    <CrosswordCell 
      disabled={cell.disabled ? 'disabled' : ''}
      highlight={cell.highlight}
      locked={cell.locked}
      wrong={cell.wrong}
      data-cellnum={cell.id}
      key={cell.id}
      focus={cell.focus}
      cellValue={cell.value}
      questionNumberDisplayed={cell.questionNumberDisplayed}
      onKeyDown={props.onKeyDown}
      onMouseDown={props.onMouseDown}
    />
    ))}
    
    </div>);
};

export default CrosswordGrid;
