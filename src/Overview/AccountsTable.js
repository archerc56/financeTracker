import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

class AccountsTable extends Component {
  constructor() {
    super();
    this.state = { };
  }
  render() {
	  
	const mapTransaction = (transaction) => {
		return (
			<tr>
				<td>{transaction.date}</td>
				<td>{transaction.description}</td>
				<td>{transaction.category}</td>
				<td>{transaction.amount}</td>
			</tr>
		);
	};
	
    return (
		<div>
			<Table striped bordered hover>
			  <thead>
				<tr>
				  <th>Date</th>
				  <th>Title</th>
				  <th>Category</th>
				  <th>Amount</th>
				</tr>
			  </thead>
			  <tbody>
				{ this.props.transactions.map(mapTransaction) }
			  </tbody>
			</Table>
		</div>
    );
  }
}

export default AccountsTable;



