import React from 'react'
import Cell from './cell/Cell';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import './_board.scss';

class Board extends React.Component {

    renderCell(rowIndex, colIndex) {
        return <Col xs={2} key={rowIndex + '-' + colIndex} className="text-center">
            <Cell value={this.props.rows[rowIndex][colIndex]} />
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

export default Board;