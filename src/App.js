import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Overview from './Overview/Overview.js'
import Budget from './Budget/Budget.js'
import Reports from './Reports/Reports.js'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor() {
    super();
    this.state = { tabIndex: 0 };
  }
  
  onTabChange(i){
	console.log("The tabIndex is: ", i);
	this.setState({
		tabIndex: i,
	});
  }
  
  showTabContents(){
	  switch(this.state.tabIndex){
		  case 0:
			return (<Overview/>);
			break;
		  case 1:
			return (<Budget/>);
			break;
		  case 2:
			return (<Reports/>);
			break;
	  }
  }
  
  render() {
    return (
	<div>
		<Navbar bg="dark" variant="dark" expand="lg">
		  <Navbar.Brand>Finance Tracker</Navbar.Brand>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
		  <Navbar.Collapse id="basic-navbar-nav">
			<Nav className="mr-auto">
			  <Nav.Link onClick={this.onTabChange.bind(this, 0)} >Overview</Nav.Link>
			  <Nav.Link onClick={this.onTabChange.bind(this, 1)} >Budget</Nav.Link>
			  <Nav.Link onClick={this.onTabChange.bind(this, 2)} >Reports</Nav.Link>
			</Nav>
		  </Navbar.Collapse>
		</Navbar>
		{this.showTabContents()}
		</div>
    );
  }
}

export default App;