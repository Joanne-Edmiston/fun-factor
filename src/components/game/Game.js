import React from 'react'
import Board from './board/Board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: Array(12).fill(Array(6).fill(144))
        };
    }

    render() {
        return (
            <div>
                <h1>Score:</h1>
                <Board rows={this.state.rows} />

            </div>
        )
    }
}

export default Game;