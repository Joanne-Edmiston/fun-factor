import React from 'react'
import Board from './board/Board';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Badge from 'react-bootstrap/Badge';

import './_game.scss';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: Array(12).fill(Array(6).fill(144)),
            started: false,
            score: 0,
        };

        this.iterateGame = this.iterateGame.bind(this);
        this.startGame = this.startGame.bind(this);
    }

    iterateGame() {

    };

    startGame() {
        this.setState({
            started: true,
        });
        this.timer = setInterval(() => this.iterateGame(), 500);
    }

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