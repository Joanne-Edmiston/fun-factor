
import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom'

const NavigationView = () =>
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Fun Factor</Navbar.Brand>
        <Nav defaultActiveKey="home" className="mr-auto">
            <Nav.Item>
                <Nav.Link as={Link} to="/" eventKey="home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/game" eventKey="game">Play Game</Nav.Link>
            </Nav.Item>
        </Nav>
    </Navbar>

export default NavigationView