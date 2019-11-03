import React from 'react'
import Game from './Game';
import Container from 'react-bootstrap/Container';

class GamePage extends React.Component {

    render() {
        return (
            <Container fluid={true}>
                <div><Game /></div>
            </Container>
        );
    }
}

export default GamePage;