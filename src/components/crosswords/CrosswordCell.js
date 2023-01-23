import {useRef, useEffect} from 'react';
import './CrosswordCell.css';

const CrosswordCell = (props) => {
  const cellInput = useRef(null);
  
  useEffect( () => {
    if (props.focus) {
      cellInput.current.focus();
    }
  })

  return (
    <div className="cell">
      <input
      //{`${cell.className} ${cell.highlight ? 'cellHighlight' : ''}`}
        className={`cellInput ${props.className ? props.className : ''}` 
          + `${props.highlight ? ' cellHighlight' : ''}`
          + `${props.locked ? ' cellLocked' : ''}`
          + `${props.wrong ? ' cellWrong' : ''}`
        }
        type="text"
        size="1"
        maxLength="1"
        value={props.cellValue}
        disabled={props.disabled}
        data-cellnum={props["data-cellnum"]}
        onKeyDown={props.onKeyDown}
        onMouseDown={props.onMouseDown}
        ref={cellInput}
        readOnly
      />
      <span className='questionNumber'>{props.questionNumberDisplayed ? props.questionNumberDisplayed : ''}</span>
    </div>
  );
};

export default CrosswordCell;
