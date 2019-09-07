import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Overview from '../Overview/Overview.js'
import Budget from '../Budget/Budget.js'
import Reports from '../Reports/Reports.js'
import NetWorth from '../NetWorth/NetWorth.js'
import Goals from '../Goals/Goals.js'
import firebase from '../firebase';
import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Dashboard extends Component {
	constructor() {
		super();
		this.state = { tabIndex: 0 };
		
		const userEmail = firebase.auth().currentUser.email;
		const username = userEmail.substr(0, userEmail.indexOf('@'));
		this.welcomeMessage = `Welcome ${username}!`;
	}

	onTabChange(i) {
		console.log("The tabIndex is: ", i);
		this.setState({
			tabIndex: i,
		});
	}

	logOutUser() {
		firebase.auth().signOut();
		location.href.replace("/");
	}

	showTabContents() {
		switch (this.state.tabIndex) {
			case 0:
				return (<Overview />);
			case 1:
				return (<Budget />);
			case 2:
				return (<Reports />);
			case 3:
				return (<NetWorth />);
			case 4:
				return (<Goals />);
			default:
				return (<Overview />);
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
							<Nav.Link onClick={this.onTabChange.bind(this, 3)} >Net Worth</Nav.Link>
							<Nav.Link onClick={this.onTabChange.bind(this, 4)} >Goals</Nav.Link>
						</Nav>
						<Nav className="mr-sm-2">
							<Navbar.Brand>{this.welcomeMessage}</Navbar.Brand>
							<Nav.Link onClick={this.logOutUser.bind(this)} >Logout</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				{this.showTabContents()}
			</div>
		);
	}
}

export default Dashboard;