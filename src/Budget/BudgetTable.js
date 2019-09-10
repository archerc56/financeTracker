import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

class AccountsTable extends Component {
  constructor() {
    super();
    this.state = { };
  }
  
	calculateExpensesPercentageUsed(category, amount){
		//create variable to hold total expenses
		let totalExpenses = 0;
		//get the current month and year
		let today = new Date();
		let currentMonth = today.getMonth()+1; 
		let currentYear = today.getFullYear();
		//find transactions that match this month, year and category and add them to the total
		this.props.accounts.forEach((account) => {
			account.transactions.forEach((transaction) => {
				//parse date of transaction
				const dateArray = transaction.date.split("/");
				//if it matches currentMonth and currentYear and category add it to totalExpenses
				if(dateArray[0] === currentMonth.toString() && dateArray[2] === currentYear.toString() && transaction.category === category){
					totalExpenses += transaction.amount;
				}
			});
		});
		
		//convert totalExpenses into percentage based on amount to spend
		const percentage = totalExpenses*100/amount;
		//return percentage
		return percentage;
	}
  
  render() {
	  
	const mapBudgetCategories = (budgetEntry) => {
		//figure out how much has been spent in this category for the current month
		let calculatedPercentageUsed = this.calculateExpensesPercentageUsed(budgetEntry.name, budgetEntry.amount);
		//determine the color of the progress bar based on the expenses for the month
		let progressColor = 'success';
		if(calculatedPercentageUsed > 100) {
			progressColor = 'danger';
		}
		else if(calculatedPercentageUsed > 75) {
			progressColor= 'warning';
		}
		return (
			<tr>
			  <td>{budgetEntry.name}</td>
			  <td>{"$" + Number(budgetEntry.amount).toFixed(2)}</td>
			  <td><ProgressBar variant={progressColor} now={calculatedPercentageUsed} label={`${Math.trunc(calculatedPercentageUsed)}%`} /></td>
			</tr>
		);
	};
	
    return (
		<div>
			<Table bordered>
			  <thead>
				<tr>
				  <th>Category</th>
				  <th>Alotted Amount</th>
				  <th>Progress</th>
				</tr>
			  </thead>
			  <tbody>
				{ this.props.budgetCategories && this.props.budgetCategories.map(mapBudgetCategories) }
			  </tbody>
			</Table>
		</div>
    );
  }
}

export default AccountsTable;



