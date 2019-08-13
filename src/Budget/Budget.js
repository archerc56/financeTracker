import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class Budget extends Component {
  constructor() {
    super();
    this.state = {  };
  }
  
  
  
  render() {
    return (
		<div className={'wrapper--large'}>
			<Table bordered>
			  <thead>
				<tr>
				  <th>Category</th>
				  <th>Alotted Amount</th>
				  <th>Progress</th>
				</tr>
			  </thead>
			  <tbody>
				<tr>
				  <td>Income</td>
				  <td>3000.00</td>
				  <td></td>
				</tr>
				<tr>
				  <td>Housing</td>
				  <td>1000.00</td>
				  <td><ProgressBar now={100} label={`${100}%`} /></td>
				</tr>
				<tr>
				  <td>Utilities</td>
				  <td>40.00</td>
				  <td><ProgressBar now={100} label={`${100}%`} /></td>
				</tr>
				<tr>
				  <td>Food</td>
				  <td>500.00</td>
				  <td><ProgressBar now={20} label={`${20}%`} /></td>
				</tr>
			  </tbody>
			</Table>
		</div>
    );
  }
}

export default Budget;



