import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

class AccountsTable extends Component {
  constructor() {
    super();
    this.state = { tabIndex: 0 };
  }
  render() {
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
						<tr>
						  <td>1/3/2019</td>
						  <td>Snacks</td>
						  <td>Food</td>
						  <td>10.00</td>
						</tr>
						<tr>
						  <td>1/2/2019</td>
						  <td>Electric</td>
						  <td>Utilities</td>
						  <td>40.00</td>
						</tr>
						<tr>
						  <td>1/1/2019</td>
						  <td>Rent</td>
						  <td>Housing</td>
						  <td>1000.00</td>
						</tr>
					  </tbody>
					</Table>
				
		
		</div>
    );
  }
}

export default AccountsTable;



