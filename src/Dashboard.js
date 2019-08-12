import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import firebase from './firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

class Dashboard extends Component{

	constructor() {
		super();
		this.logOutUser = this.logOutUser.bind(this);
	  }

	logOutUser() {
		firebase.auth().signOut().then(console.log("user logged out")).catch(error => {
			console.log("error: ",error);
	   });
	}
	   
	   render(){
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
				 <Button variant="primary" onClick={this.logOutUser} children="Log Out" />;
			   </Navbar>
			   
		   );
	   };
}

export default Dashboard;