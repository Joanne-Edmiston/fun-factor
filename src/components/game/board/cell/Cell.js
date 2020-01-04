import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './_cell.scss';

function Cell(props) {

    const [selected, setSelected] = useState(props.isSelected);

    const onClick = () => {
        if (!selected) {
            props.onSelected(props.value);
        } else {
            props.onUnSelected(props.value);
        }

        setSelected(!selected);
    };

    return (
        <button
            className={"game-cell game-cell-" + (props.value ? "filled" : "empty") + (props.isSelected ? " selected" : "")}
            onClick={onClick}
            disabled={props.disabled} >
            {props.value}
        </button>);
}

Cell.propTypes = {
    value: PropTypes.number,
    isSelected: PropTypes.bool.isRequired,
    onSelected: PropTypes.func.isRequired,
    onUnSelected: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
}
export default Cell;