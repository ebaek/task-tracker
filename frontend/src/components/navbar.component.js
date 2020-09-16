import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import CreateTask from '../components/create-task.component';

export default function NavbarComponent() {
    return (
        <Navbar bg="light" expand="lg" data-testid="navbar-wrapper">
            <Navbar.Brand>IBM Task Manager</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link to="/">Home</Nav.Link>
                    <CreateTask className="justify-content-end"/>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
