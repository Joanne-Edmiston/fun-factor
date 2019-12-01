import React from 'react'
import Board from './board/Board';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Badge from 'react-bootstrap/Badge';

import './_game.scss';

class Game extends React.Component {

    maxRows = 12;
    maxColumns = 6;

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

            if (!gameOver){
                newRows[0][this.getNextStartingColumn()] = 144;
            }

            return {
                score: prevState.score + 1,
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
        this.timer = setInterval(() => this.iterateGame(), 500);
    }

    stopGame() {
        this.setState({
            started: false,
        });

        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    componentWillUnmount() {

        this.stopGame();
    };

    render() {
        return (
            <div>
                <div className="game-header">
                    <div className="game-header-content">

                        {this.state.started
                            ? <h1>Score:<Badge variant="secondary">{this.state.score}</Badge></h1>
                            : <ButtonToolbar>
                                <Button onClick={this.startGame} size="lg" block>
                                    Begin a new Game
                            </Button>
                            </ButtonToolbar>}
                    </div>
                    <Board rows={this.state.rows} />
                </div>
            </div>
        )
    }
}

export default Game;