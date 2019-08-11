import React from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import firebase from './firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
const logOutUser = () => {
 firebase.auth().signOut();
};

const Dashboard = (authenticated) => {
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
		  <Button variant="primary" onClick={logOutUser} children="Log Out" />;
		</Navbar>
		
    );
};
export default Dashboard;