import React from 'react'
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Badge from 'react-bootstrap/Badge';

import Board from './board/Board';
import ConfirmationModal from '../common/modals/ConfirmationModal';

import './_game.scss';

class Game extends React.Component {

    maxRows = 12;
    maxColumns = 6;
    interval = 500;

    constructor(props) {
        super(props);
        this.state = {
            rows: this.initialiseGrid(),
            started: false,
            score: 0,
            gameOver: false,
        };

        this.iterateGame = this.iterateGame.bind(this);
        this.startGame = this.startGame.bind(this);
        this.stopGame = this.stopGame.bind(this);
        this.onGameOverConfirmed = this.onGameOverConfirmed.bind(this);
        this.initialiseGrid = this.initialiseGrid.bind(this);
        this.cloneGrid = this.cloneGrid.bind(this);
        this.getNextStartingColumn = this.getNextStartingColumn.bind(this);
    }

    initialiseGrid() {
        let rows = Array(this.maxRows);
        for (let r = 0; r < this.maxRows; r++) {
            rows[r] = Array(this.maxColumns).fill(null);
        }

        return rows;
    }


    cloneGrid(prevRows) {
        let rows = Array(prevRows.length);
        for (let r = 0; r < rows.length; r++) {
            rows[r] = Array(prevRows[r].length).fill(null);
            for (let c = 0; c < rows[r].length; c++) {
                rows[r][c] = prevRows[r][c];
            }
        }

        return rows;
    }

    getNextStartingColumn() {
        return Math.floor(Math.random() * Math.floor(this.maxColumns));
    }

    iterateGame() {

        if (this.state.gameOver) {
            this.stopGame();
        }

        this.setState((prevState) => {

            if (prevState.gameOver)
                return;

            let newRows = this.cloneGrid(prevState.rows);
            let gameOver = false;

            for (let r = newRows.length - 1; r >= 0; r--) {
                for (let c = 0; c < newRows[r].length; c++) {
                    if (newRows[r][c] == null) {

                        if (r > 0) {
                            // move cell above down to current cell
                            newRows[r][c] = newRows[r - 1][c];
                            newRows[r - 1][c] = null;
                        }

                    } else if (r === 0) {
                        gameOver = true;
                    }
                }
            }

            if (!gameOver) {
                newRows[0][this.getNextStartingColumn()] = 144;
            }

            return {
                score: prevState.score,
                rows: newRows,
                gameOver: gameOver
            };
        });
    };

    startGame() {
        this.setState({
            rows: this.initialiseGrid(),
            score: 0,
            started: true,
            gameOver: false,
        });
        this.timer = setInterval(() => this.iterateGame(), this.interval);
    }

    stopGame() {
        this.setState({
            started: false,
        });

        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    onGameOverConfirmed(){
        this.setState({
            gameOver: false,
            //rows: this.initialiseGrid(),
        })
    }

    componentWillUnmount() {

        this.stopGame();
    };

    render() {
        return (
            <div>
                <div className="game-header">
                    <div className="game-header-content">

                        {this.state.started || this.state.gameOver
                            ? <h1>Score:<Badge variant="secondary">{this.state.score}</Badge></h1>
                            : <ButtonToolbar>
                                <Button onClick={this.startGame} size="lg">
                                    Begin a new Game
                            </Button>
                            </ButtonToolbar>}
                    </div>
                </div>
                <Board rows={this.state.rows} />
                <ConfirmationModal 
                    show={this.state.gameOver} 
                    heading={"Game Over!"} 
                    body={"Game Over!"}
                    onClose={this.onGameOverConfirmed}/>
            </div>
        )
    }
}

export default Game;