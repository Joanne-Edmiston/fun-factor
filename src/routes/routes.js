import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import HomePage from '../components/home/HomePage';
import GamePage from '../components/game/GamePage';
import NotFoundPage from '../components/errors/NotFoundPage'
import NavigationView from '../components/navigation/NavigationView';

class Routes extends React.Component {

    render() {
        return (<Router>
            <NavigationView />
            <Switch> 
                <Route exact path="/" component={HomePage} />
                <Route path="/game" component={GamePage} />
                <Route component={NotFoundPage} />
            </Switch>
        </Router>);         
    }     
}     
    
export default Routes;