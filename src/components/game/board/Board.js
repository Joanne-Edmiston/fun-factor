import React from 'react'
import PropTypes from 'prop-types';
import Cell from './cell/Cell';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import './_board.scss';

class Board extends React.Component {

    renderCell(rowIndex, colIndex) {

        let item = this.props.rows[rowIndex][colIndex];

        return <Col xs={2} key={rowIndex + '-' + colIndex} className="text-center">
            <Cell 
                value={item ? item.value : null}
                isSelected={item ? item.isSelected : false}
                disabled={this.props.disabled || !item || (this.props.maxSelected && !item.isSelected) }
                onSelected={() => this.props.onCellSelected(item)}
                onUnSelected={() => this.props.onCellUnselected(item)} />
        </Col>;
    }


    renderRow(rowIndex) {

        let cells = [];

        for (let i = 0; i < this.props.rows[rowIndex].length; i++) {
            cells.push(this.renderCell(rowIndex, i));
        }

        return (<Row noGutters={true} key={rowIndex}>{cells}</Row>)
    }

    render() {

        let rows = [];

        for (let i = 0; i< this.props.rows.length; i++){
            rows.push(this.renderRow(i));
        }

        return (
            <Container fluid={true} >
                <div className="game-board">
                {rows}

                </div>
            </Container>
        )
    }
}

Board.propTypes = {
    rows: PropTypes.array.isRequired,
    onCellSelected: PropTypes.func.isRequired,
    onCellUnselected: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    maxSelected: PropTypes.bool,
};

export default Board;