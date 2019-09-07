import React, { Component } from 'react';
import Tab from 'react-bootstrap/Tab';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import AccountsTable from './AccountsTable.js';
import AddAccountModal from './AddAccountModal.js';
import AddTransactionModal from './AddTransactionModal.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from "../firebase";
import DatabaseUtil from "./../Database/DatabaseUtil";
import '../App.css';

class Overview extends Component {

	constructor() {
		super();
		this.state = {
			accounts: [],
			showAccountModal: false,
			showTransactionModal: false,
			categories: []
		};
		this.showAddAccountModal = this.showAddAccountModal.bind(this);
		this.cancelAddAccount = this.cancelAddAccount.bind(this);
		this.submitAddAccount = this.submitAddAccount.bind(this);
		this.showAddTransactionModal = this.showAddTransactionModal.bind(this);
		this.cancelTransactionAccount = this.cancelTransactionAccount.bind(this);
		this.submitAddTransaction = this.submitAddTransaction.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}
	
	/**
	 * Handles the user clicking add account
	 */
	showAddAccountModal() {
		this.setState({
			showAccountModal: true,
		});
	}
	
	/**
	 * Handles the user cancelling add account
	 */
	cancelAddAccount() {
		this.setState({
			showAccountModal: false,
		});
	}
	
	/**
	 * Handles the user submitting an added account 
	 */
	submitAddAccount(accountName) {
		//create new and unique (hopefully) id for the account
		const min = 2;
		const max = 500;
		const id = Math.trunc(Math.random() * (+max - +min) + +min);
		
		//add account to DB
		DatabaseUtil.addAccountToDatabase(accountName, id.toString(10));
		console.log(id);
		//close the modal
		this.setState({
			showAccountModal: false,
		});
	}
	
	/**
	 * Handles the user clicking add transaction
	 */
	showAddTransactionModal() {
		console.log('showing add transaction modal...');
		this.setState({
			showTransactionModal: true,
		});
	}
	
	/**
	 * Handles the user cancelling add account
	 */
	cancelTransactionAccount() {
		this.setState({
			showTransactionModal: false,
		});
	}

	/**
	 * Handles the user clicking add transaction
	 */
	submitAddTransaction(date, description, category, amount){

		let currAccount = null;

		//The processing in this if statement just gets the currently selected account
		//This can likely be improved
		if(this.state.accounts.length > 0){
			let copyAccounts = this.state.accounts;
			let urlAccountId = window.location.hash;
			

			if(urlAccountId){
				urlAccountId = urlAccountId.replace('#link','');
				currAccount = copyAccounts.find(function(account) {
					return account.id === urlAccountId;
				});
			}
			else{
				currAccount = copyAccounts[0];
			}
		}

		//Once the current account has been found, add the transaction to the database
		if(currAccount){
			//The structure of the transaction object isn't set by the database, so fields can be added, removed, and renamed
			//at will. 
			var transactionData = {
				date: date, description: description, category: category, amount: amount
			};
			DatabaseUtil.addTransactionToDatabase(currAccount, transactionData);
		}
		
		//close the modal
		this.setState({
			showTransactionModal: false,
		});
		
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

		var docRef = firebase.firestore().collection("ValidCategories").doc("Categories");

		docRef.get().then(function(doc){
			if(doc.exists){
				self.setState({
					categories: doc.data().categoryList
				});
			}
		});


	}

	render() {
		const mapAccount = (account) => {			
			return (
				<ListGroup.Item key={account.id} action href={`#link${account.id}`} >
					{account.name}
				</ListGroup.Item>
			);
		};

		const mapTransactions = ((account) => {
			return (				
				<Tab.Pane eventKey={`#link${account.id}`}>
					<AccountsTable
						transactions={account.transactions}
					/>					
				</Tab.Pane>
			);
		});

		return (
			<div>
				<div className={'wrapper--large'}>
					<ButtonToolbar className={'wrapper--small'}>
						<Button variant="dark" size="lg" onClick={this.showAddAccountModal}>Add Account</Button>
					</ButtonToolbar>
					<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
						<Row>
							<Col sm={2}>
								<ListGroup>
									{this.state.accounts.map(mapAccount)}
								</ListGroup>
							</Col>
							<Col sm={10}>
								<Tab.Content>
									<ButtonToolbar className={'wrapper--small'}>
										{this.state.accounts.length > 0 && <Button variant="dark" size="lg" onClick={this.showAddTransactionModal}>Add Transaction</Button>}	
										
									</ButtonToolbar>
									{this.state.accounts.map(mapTransactions)}
								</Tab.Content>
							</Col>
						</Row>
					</Tab.Container>
				</div>
				<AddAccountModal
					show={this.state.showAccountModal}
					onCancel={this.cancelAddAccount}
					onSubmit={this.submitAddAccount}>
				</AddAccountModal>
				<AddTransactionModal
					show={this.state.showTransactionModal}
					onCancel={this.cancelTransactionAccount}
					onSubmit={this.submitAddTransaction}
					categories={this.state.categories}>
				</AddTransactionModal>
			</div>
		);
	}
}

export default Overview;



