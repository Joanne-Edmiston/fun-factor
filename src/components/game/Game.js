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
            rows: Array(this.maxRows).fill(Array(this.maxColumns).fill(null)),
            started: false,
            score: 0,
        };

        this.iterateGame = this.iterateGame.bind(this);
        this.startGame = this.startGame.bind(this);
        this.stopGame = this.stopGame.bind(this);
        this.getNextStartingColumn = this.getNextStartingColumn.bind(this);
    }

    getNextStartingColumn() {
        return Math.floor(Math.random() * Math.floor(this.maxColumns));
    }

    iterateGame() {


        this.setState((prevState) => {

            let newRows = [];

            for (let r = this.maxRows - 1; r > 0; r--) {
                newRows[r] = [];
                for (let c = 0; c < this.maxColumns; c++) {
                    if (prevState.rows[r][c]) {
                        if (r === this.maxRows - 1 || prevState.rows[r + 1][c])
                            newRows[r][c] = prevState.rows[r][c];
                        else
                            newRows[r][c] = null;
                    } else {
                        newRows[r][c] = prevState.rows[r - 1][c];
                    }
                }
            }

            newRows[0] = Array(this.maxColumns).fill(null);
            newRows[0][this.getNextStartingColumn()] = 144;


            return {
                score: prevState.score + 1,
                rows: newRows,
            };
        });
    };

    startGame() {
        this.setState({
            started: true,
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
        )
    }
}

export default Game;