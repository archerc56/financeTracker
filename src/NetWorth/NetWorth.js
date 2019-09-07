import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import firebase from "../firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class NetWorth extends Component {

	constructor() {
		super();
		this.state = {
			accounts: [],
		};
		
		this.totalNetWorth = 0;
		
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount() {
		const self = this;
		var userUid = firebase.auth().currentUser.uid;

		//Adds a listener to the user's section of the database. Whenever the section is updated, the page will rerender
		firebase.firestore().collection("users").doc(userUid).onSnapshot(function(doc) {
			console.log("Current data: ", doc.data());
			self.setState({
				accounts: doc.data().Accounts
			});
		});
	}

	render() {
		const mapAccountTotals = (account) => {			
			//calculate total transaction amount for this account
			let totalTransactionAmount = 0;
			account.transactions.forEach((transaction) => {
				//add transactions whose category is 'Deposit' or 'Income'
				if(transaction.category === 'Deposit' || transaction.category === 'Income'){
					totalTransactionAmount += transaction.amount;
				}
				//subtract all other transactions
				else{
					totalTransactionAmount -= transaction.amount;
				}
			});
			
			//add totalTransactionAmount to this.totalNetWorth
			this.totalNetWorth += totalTransactionAmount;
			
			//update the color of the net worth
			this.netWorthColor = 'green';
			if(this.totalNetWorth < 0){
				this.netWorthColor = 'red';
			}
			
			//choose a color for this account amount
			let amountColor = 'green';
			if(totalTransactionAmount < 0){
				amountColor = 'red';
			}
			
			return (
				<tr>
					<td>{account.name}</td>
					<td style={{color:amountColor}}>{"$ " + Number(totalTransactionAmount).toFixed(2)}</td>
				</tr>
			);
		};

		return (
			<div className={'wrapper--large'}>
				<Table striped bordered hover>
				  <thead>
					<tr>
					  <th>Account</th>
					  <th>Total</th>
					</tr>
				  </thead>
				  <tbody>
					{ this.state.accounts && this.state.accounts.map(mapAccountTotals) }
					<tr>
						<td><b>TOTAL</b></td>
						<td style={{color:this.netWorthColor}}>{"$ " + Number(this.totalNetWorth).toFixed(2)}</td>
					</tr>
				  </tbody>
				</Table>
			</div>
		);
	}
}

export default NetWorth;







