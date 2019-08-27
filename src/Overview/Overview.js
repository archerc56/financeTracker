import React, { Component } from 'react';
import Tab from 'react-bootstrap/Tab';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import AccountsTable from'./AccountsTable.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class Overview extends Component {
  constructor() {
    super();
    this.state = { 
		accounts: [],
	};
  }
  
  componentDidMount() {
	  //this will be where we do the api call to load the data but for now we will set the state here
	  this.setState({
		  accounts: [ 
			{
				name:'Checking Account', 
				id: '1', 
				transactions: [
					{date: '1/3/2019', description: 'Snacks', category: 'Food', cost: '10.00'},
					{date: '1/2/2019', description: 'Electric', category: 'Utilities', cost: '40.00'},
					{date: '1/1/2019', description: 'Rent', category: 'Housing', cost: '1000.00'},
				]
			},
			{
				name:'Savings Account', 
				id: '2', 
				transactions: [
					{date: '1/7/2019', description: 'Interest', category: 'Income', cost: '10.00'},
					{date: '1/6/2019', description: 'Paycheck', category: 'Income', cost: '4000.00'},
				]
			},
		],
	  });
  }
  
  
  render() {
	
	const mapAccount = (account) => {
		return (
			<ListGroup.Item action href={`#link${account.id}`} >
				{account.name}
			</ListGroup.Item>
		);
	};
	
	const mapTransactions = (account) => {
		return (
			<Tab.Pane eventKey={`#link${account.id}`}>
				<AccountsTable
					transactions={account.transactions}
				/>
			</Tab.Pane>
		);
	};
	
    return (
	<div className={'wrapper--large'}>
		<ButtonToolbar className={'wrapper--small'}>
			<Button variant="dark" size="lg">Add Account</Button>
		</ButtonToolbar>
		<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
		  <Row>
			<Col sm={2}>
			  <ListGroup>
				{ this.state.accounts.map(mapAccount) }
			  </ListGroup>
			</Col>
			<Col sm={10}>
			  <Tab.Content>
			  <ButtonToolbar className={'wrapper--small'}>
				  <Button variant="dark" size="lg">Add Transaction</Button>
			  </ButtonToolbar>
				{ this.state.accounts.map(mapTransactions) }
			  </Tab.Content>
			</Col>
		  </Row>
		</Tab.Container>
		</div>
    );
  }
}

export default Overview;



