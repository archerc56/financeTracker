import React, { Component } from 'react';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import AccountsTable from'./AccountsTable.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class Overview extends Component {
  constructor() {
    super();
    this.state = { tabIndex: 0 };
  }
  
  
  
  render() {
    return (
	<div>
		<h1> Welcome, User! </h1>
		<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
		  <Row>
			<Col sm={2}>
			  <ListGroup>
				<ListGroup.Item action href="#link1" >
				  Checking Account
				</ListGroup.Item>
				<ListGroup.Item action href="#link2">
				  Savings Account
				</ListGroup.Item>
			  </ListGroup>
			</Col>
			<Col sm={10}>
			  <Tab.Content>
				<Tab.Pane eventKey="#link1">
				  <AccountsTable/>
				</Tab.Pane>
				<Tab.Pane eventKey="#link2">
				  Some more stuff for Link 2 page
				</Tab.Pane>
			  </Tab.Content>
			</Col>
		  </Row>
		</Tab.Container>
		
		</div>
    );
  }
}

export default Overview;



