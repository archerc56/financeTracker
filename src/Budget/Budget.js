import React, { Component } from 'react';
import firebase from "../firebase";
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import DatabaseUtil from "./../Database/DatabaseUtil";
import AddBudgetModal from "./AddBudgetModal.js";
import BudgetTable from "./BudgetTable.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class Budget extends Component {
	constructor() {
		super();
		this.state = {
			accounts: [],
			budgets: [],
			showBudgetModal: false,
		};
		
		this.showAddBudget = this.showAddBudget.bind(this);
		this.cancelAddBudget = this.cancelAddBudget.bind(this);
		this.submitAddBudget = this.submitAddBudget.bind(this);
	}
	
	/**
	 * Handles the user clicking add budget
	 */
	showAddBudget() {
		this.setState({
			showBudgetModal: true,
		});
	}
	
	/**
	 * Handles the user cancelling add budget
	 */
	cancelAddBudget() {
		this.setState({
			showBudgetModal: false,
		});
	}
	
	/**
	 * Handles the user submitting an added budget 
	 */
	submitAddBudget(budgetCategories) {
		//get the current month and year
		let today = new Date();
		let currentMonth = today.getMonth(); 
		let currentYear = today.getFullYear();
		
		//add account to DB
		DatabaseUtil.addBudgetToDatabase(currentMonth, currentYear, budgetCategories);
		
		//close the modal
		this.setState({
			showBudgetModal: false,
		});
	}

	componentDidMount() {
		const self = this;
		var userUid = firebase.auth().currentUser.uid;

		//Adds a listener to the user's section of the database. Whenever the section is updated, the page will rerender
		firebase.firestore().collection("users").doc(userUid).onSnapshot(function(doc) {
			self.setState({
				accounts: doc.data().Accounts,
				budgets: doc.data().Budgets,
			});
		});
	}
	  
	render() {	
		//get the current month and year
		let today = new Date();
		let currentMonth = today.getMonth(); 
		let currentYear = today.getFullYear();
		
		let budgetView = (
			<div className={'wrapper--large'}>
				<ButtonToolbar className={'wrapper--small'}>
					<Button variant="dark" size="lg" onClick={this.showAddBudget}>Add Budget</Button>
				</ButtonToolbar>
				<AddBudgetModal
					show={this.state.showBudgetModal}
					onCancel={this.cancelAddBudget}
					onSubmit={this.submitAddBudget}>
				</AddBudgetModal>
			</div>
		);
		
		//find the current months category list
		let budgetCategories = [];
		
		this.state.budgets.forEach((budget) => {
			if(budget.month === currentMonth && budget.year === currentYear){
				budgetCategories = budget.categories;
				budgetView = (
					<div className={'wrapper--large'}>
						<BudgetTable
							accounts={this.state.accounts}
							budgetCategories={budgetCategories}>
						</BudgetTable>
					</div>
				);
			}
		});
		
		return budgetView;
	}
}

export default Budget;



