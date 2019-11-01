import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Home from '../components/home/Home';
import Game from '../components/game/Game';

class Routes extends React.Component{

    render(){
        return(<Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/game">Play</Link>
                    </li>
                </ul>
                <Route exact path="/" component={Home} />
                <Route path="/game" component={Game} />
            </div>
        </Router>);
    }
}

export default Routes;