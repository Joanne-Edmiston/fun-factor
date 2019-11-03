import React from 'react';
import './_cell.scss';

function Cell(props){
    return(
    <button 
        className={"game-cell-" + (props.value ? "filled" : "empty")}>
        {props.value}
    </button>);
}

export default Cell;