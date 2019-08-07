import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor() {
    super();
    this.state = { tabIndex: 0 };
  }
  render() {
    return (
		<Navbar bg="light" expand="lg">
		  <Navbar.Brand href="#home">Finance Tracker</Navbar.Brand>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
		  <Navbar.Collapse id="basic-navbar-nav">
			<Nav className="mr-auto">
			  <Nav.Link href="#home">Overview</Nav.Link>
			  <Nav.Link href="#link">Budget</Nav.Link>
			  <Nav.Link href="#reports">Reports</Nav.Link>
			</Nav>
		  </Navbar.Collapse>
		</Navbar>
    );
  }
}

export default App;
