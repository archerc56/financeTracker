import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class AddTransactionModal extends Component {
  constructor() {
    super();
    this.state = { };
	this.defaultCategories = ['Deposit', 'Housing', 'Food', 'Utilities'];
  }
  render() {
	if(this.props.categories){
		this.defaultCategories = this.props.categories;
	}  
	const mapCategories = ((category) => {
		return (				
			<option key={category}>{category}</option>
		);
	});
	  
	const handleSubmit = event => {
			const date = document.getElementById("newTransactionDateBox").value;
			const description = document.getElementById("newTransactionDescriptionBox").value;
			const category = document.getElementById("newTransactionCategoryBox").value;
			const amount = document.getElementById("newTransactionAmountBox").value;
			if(isNaN(amount)){
				alert('Amount must be a number.\nPlease remove special characters.\nEx: 50 or 50.00');
			}
			else{
				this.props.onSubmit(date, description, category, amount);
			}
	};
	
    return (
		<Modal show={this.props.show} onHide={this.props.onCancel}>
			<Modal.Header closeButton>
				<Modal.Title>Add New Transaction</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group as={Row} controlId="formHorizontalDate">
					<Form.Label column sm={2}>
					  Date
					</Form.Label>
					<Col sm={10}>
					  <Form.Control id='newTransactionDateBox' />
					</Col>
					</Form.Group>
					<Form.Group as={Row} controlId="formHorizontalDescription">
					<Form.Label column sm={2}>
					  Description
					</Form.Label>
					<Col sm={10}>
					  <Form.Control id='newTransactionDescriptionBox' />
					</Col>
					</Form.Group>
					<Form.Group as={Row} controlId="formHorizontalCategory">
						<Form.Label column sm={2}>
						  Category
						</Form.Label>
						<Col sm={10}>
						  <Form.Control as="select" id='newTransactionCategoryBox'>
							{this.defaultCategories.map(mapCategories)}
						  </Form.Control>
						</Col>
					</Form.Group>
					<Form.Group as={Row} controlId="formHorizontalAmount">
					<Form.Label column sm={2}>
					  Amount
					</Form.Label>
					<Col sm={10}>
					  <Form.Control id='newTransactionAmountBox' />
					</Col>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={this.props.onCancel}>
					Close
				</Button>
				<Button type="submit" variant="primary" onClick={handleSubmit}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
    );
  }
}

export default AddTransactionModal;



