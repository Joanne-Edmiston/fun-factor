import React from 'react'
import { NavLink } from 'react-router-dom';
import './navigation.css'

const NavigationView = () => <ul>
        <li>
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
        </li>
        <li>
            <NavLink activeClassName="active" to="/game">Game</NavLink>
        </li>
    </ul>

export default NavigationView