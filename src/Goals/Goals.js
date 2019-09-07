import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import AddGoalModal from './AddGoalModal.js';
import firebase from "../firebase";
import DatabaseUtil from "./../Database/DatabaseUtil";
import 'bootstrap/dist/css/bootstrap.min.css';

class Goals extends Component {
	constructor() {
		super();
		this.state = { 
			showGoalModal: false,
			goals: [],
		};
		
		this.showAddGoalModal = this.showAddGoalModal.bind(this);
		this.cancelAddGoal = this.cancelAddGoal.bind(this);
		this.submitAddGoal = this.submitAddGoal.bind(this);
	}
	  
	 /**
	 * Handles the user clicking add goal
	 */
	showAddGoalModal() {
		this.setState({
			showGoalModal: true,
		});
	}

	/**
	 * Handles the user cancelling add goal
	 */
	cancelAddGoal() {
		this.setState({
			showGoalModal: false,
		});
	}

	/**
	 *
	 * Handles the user submitting an added goal 
	 *
	 * @param {String} goalDescription description of the new goal
	 */
	submitAddGoal(goalDescription) {
		
		//add account to DB
		DatabaseUtil.addGoalToDatabase(goalDescription, this.state.goals.length);
		
		//close the modal
		this.setState({
			showGoalModal: false,
		});
	}
	
	/**
	 *
	 * Handles the user submitting an added goal 
	 *
	 * @param {int} goalID - ID of the goal being toggled
	 */
	submitToggleGoal(goalID) {
		let tempGoals = this.state.goals.slice();
		let goal;
		for(goal of tempGoals){
			if(goal.id === goalID){
				goal.complete = !goal.complete;
			}
		}

		//Update the goals in the database
		DatabaseUtil.updateGoalsInDatabase(tempGoals);

	}
	
	componentDidMount() {
		const self = this;
		var userUid = firebase.auth().currentUser.uid;

		//Adds a listener to the user's section of the database. Whenever the section is updated, the page will rerender
		firebase.firestore().collection("users").doc(userUid).onSnapshot(function(doc) {
			self.setState({
				goals: doc.data().Goals
			});
		});
	}
	
	render() {
	  
		const mapGoals = (goal) => {			
			return (
				<tr>
					<td><input type='checkbox' checked={goal.complete} onChange={this.submitToggleGoal.bind(this, goal.id)}/></td>
					<td>{goal.description}</td>
				</tr>
			);
		};

		return (
			<div className={'wrapper--large'}>
				<ButtonToolbar className={'wrapper--small'}>
					<Button variant="dark" size="lg" onClick={this.showAddGoalModal}>Add Goal</Button>
				</ButtonToolbar>
				<Table striped bordered hover>
				  <thead>
					<tr>
						<th>Complete</th>
						<th>Description</th>
					</tr>
				  </thead>
				  <tbody>
					{ this.state.goals && this.state.goals.map(mapGoals) }
				  </tbody>
				</Table>
				<AddGoalModal
					show={this.state.showGoalModal}
					onCancel={this.cancelAddGoal}
					onSubmit={this.submitAddGoal}>
				</AddGoalModal>
			</div>
		);
	}
}

export default Goals;



