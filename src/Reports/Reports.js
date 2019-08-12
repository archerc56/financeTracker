import React, { Component } from 'react';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import ExpensesByCategory from './ExpensesByCategory.js';
import ExpensesOverTime from './ExpensesOverTime.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class Reports extends Component {
  constructor() {
    super();
    this.state = {  };
  }
  
  
  
  render() {
    return (
	<div className={'wrapper--large'}>
		<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
		  <Row>
			<Col sm={2}>
			  <ListGroup>
				<ListGroup.Item action href="#link1">
				  Expenses By Category
				</ListGroup.Item>
				<ListGroup.Item action href="#link2">
				  Expenses Over Time
				</ListGroup.Item>
			  </ListGroup>
			</Col>
			<Col sm={10}>
			  <Tab.Content>
				<Tab.Pane eventKey="#link1">
				  <ExpensesByCategory/>
				</Tab.Pane>
				<Tab.Pane eventKey="#link2">
				  <ExpensesOverTime/>
				</Tab.Pane>
			  </Tab.Content>
			</Col>
		  </Row>
		</Tab.Container>
		
		</div>
    );
  }
}

export default Reports;



