import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
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
		  <Navbar.Brand href="#overview">Finance Tracker</Navbar.Brand>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
		  <Navbar.Collapse id="basic-navbar-nav">
			<Nav className="mr-auto">
			  <Nav.Link href="#overview">Overview</Nav.Link>
			  <Nav.Link href="#link">Budget</Nav.Link>
			  <Nav.Link href="#reports">Reports</Nav.Link>
			</Nav>
		  </Navbar.Collapse>
		</Navbar>
    );
  }
}

export default App;