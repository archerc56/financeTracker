import React, { Component } from 'react';
import Tab from 'react-bootstrap/Tab';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import AccountsTable from './AccountsTable.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from "../firebase";
import DatabaseUtil from "./../Database/DatabaseUtil";
import '../App.css';

class Overview extends Component {
	constructor() {
		super();
		this.state = {
			accounts: [],
		};
		this.handleAddAccount = this.handleAddAccount.bind(this);
		this.handleAddTransaction = this.handleAddTransaction.bind(this);
	}

	handleAddTransaction(){
		if(this.state.accounts.length > 0){
			let copyAccounts = this.state.accounts;
			let urlAccountId = window.location.hash;
			let currAccount = null;

			if(urlAccountId){
				urlAccountId = urlAccountId.replace('#link','');
				currAccount = copyAccounts.find(function(account) {
					return account.id === urlAccountId;
				});
			}
			else{
				currAccount = copyAccounts[0];
			}

			if(currAccount){
				var userUid = firebase.auth().currentUser.uid;
				var docData = {
					name: 'exampleTransaction', date: '1/3/2019', description: 'Snacks', category: 'Food', amount: '10.00' 
				};
				DatabaseUtil.addTransactionToDatabase(currAccount, docData);
				

			}
			this.setState({
				accounts : copyAccounts
			})
		}
		
	}

	handleAddAccount() {
		let accountsCopy = this.state.accounts.slice();
		let newAccount = {
			name: 'Checking Account',
			id: '1',
		}

		accountsCopy.push(newAccount);

		this.setState({
			accounts: accountsCopy
		});
	}

	componentDidMount() {
		// Get a reference to the database service
		/* 	var database = firebase.database();
			var userId = firebase.auth().currentUser.uid;
			var starCountRef = database.ref('posts/' + postId + '/starCount');
			starCountRef.on('value', function(snapshot) {
			  updateStarCount(postElement, snapshot.val());
			}); */
		//this will be where we do the api call to load the data but for now we will set the state here
		// this.setState({        //Create a new entry in the database.
		// 	//TODO: revisit to potentially create a collection per user
		// 	//firebase
		// 	/*  .firestore()
		// 	 .collection("users")
		// 	 .doc(userUid).set(); */
		// 	//.collection("Transactions")
		// 	//.doc(userUid)
		// 	//.set(docData);
		// 	//})
		// 	// .catch(alert);
		// 	accounts: [
		// 		{
		// 			name: 'Checking Account',
		// 			id: '1',
		// 			transactions: [
		// 				{ date: '1/3/2019', description: 'Snacks', category: 'Food', cost: '10.00' },
		// 				{ date: '1/2/2019', description: 'Electric', category: 'Utilities', cost: '40.00' },
		// 				{ date: '1/1/2019', description: 'Rent', category: 'Housing', cost: '1000.00' },
		// 			]
		// 		},
		// 		{
		// 			name: 'Savings Account',
		// 			id: '2',
		// 			transactions: [
		// 				{ date: '1/7/2019', description: 'Interest', category: 'Income', cost: '10.00' },
		// 				{ date: '1/6/2019', description: 'Paycheck', category: 'Income', cost: '4000.00' },
		// 			]
		// 		},
		// 	],
		// });
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
			let transactions = DatabaseUtil.getTransactionsFromAccountPromise(account).then(function (querySnapshot) {
				var doc = null;
				var transactions = [];
				for(doc of querySnapshot.docs){
	
					// doc.data() is never undefined for query doc snapshots
					console.log(doc.id, " =>nnn ", doc.data());
					transactions.push(doc.data());
				}
			});
			if (transactions.then){
				return null;
			}
			return (
				
				<Tab.Pane eventKey={`#link${account.id}`}>
					<AccountsTable
						transactions={transactions}
					/>
					
				</Tab.Pane>
			);
		}).bind(this);

		return (
			<div className={'wrapper--large'}>
				<ButtonToolbar className={'wrapper--small'}>
					<Button variant="dark" size="lg" onClick={this.handleAddAccount}>Add Account</Button>
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
		);
	}
}

export default Overview;



