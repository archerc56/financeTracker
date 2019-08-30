import React, { Component } from 'react';
import Tab from 'react-bootstrap/Tab';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import AccountsTable from './AccountsTable.js';
import AddAccountModal from './AddAccountModal.js';
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
		};
		this.idCount = 1;
		this.showAddAccountModal = this.showAddAccountModal.bind(this);
		this.cancelAddAccount = this.cancelAddAccount.bind(this);
		this.submitAddAccount = this.submitAddAccount.bind(this);
		this.handleAddTransaction = this.handleAddTransaction.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	/**
	 * Handles the user clicking add transaction
	 */
	handleAddTransaction(){

		let currAccount = null;

		//TODO: Add form to get transaction info from user

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

			//TODO: Remove once form to add transaction data is added. 
			//The structure of the transaction object isn't set by the database, so fields can be added, removed, and renamed
			//at will. 
			var transactionData = {
				date: '8/28/2019', description: 'Hamburger', category: 'Food', amount: 1000.00
			};
			DatabaseUtil.addTransactionToDatabase(currAccount, transactionData);
		}
		
	}

	/**
	 * Handles the user clicking add account
	 */
	showAddAccountModal() {
		this.setState({
			showAccountModal: true,
		});
	}
	
	cancelAddAccount() {
		console.log("Cancel Add Account...");
		this.setState({
			showAccountModal: false,
		});
	}
	
	submitAddAccount(accountName) {
		//add account to DB
		DatabaseUtil.addAccountToDatabase(accountName, this.idCount.toString(10));
		this.idCount++;
		//close the modal
		this.setState({
			showAccountModal: false,
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
	}

	render() {
		const mapAccount = (account) => {			
			return (
				<ListGroup.Item action href={`#link${account.id}`} >
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
										{this.state.accounts.length > 0 && <Button variant="dark" size="lg" onClick={this.handleAddTransaction}>Add Transaction</Button>}	
										
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
			</div>
		);
	}
}

export default Overview;



