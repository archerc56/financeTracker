import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class AddBudgetModal extends Component {
  constructor() {
    super();
    this.state = { };
  }
  render() {
	  
	const mapCategoriestoFormFields = ((category) => {
		return (				
			<Form.Group as={Row} key={category} controlId={`formHorizontal${category}`}>
				<Form.Label column sm={2}>
					{category}
				</Form.Label>
				<Col sm={10}>
				  <Form.Control id={`newTransaction${category}Box`} />
				</Col>
			</Form.Group>
		);
	});
	  
	const handleSubmit = event => {
		const budgetCategories = [];
		
		this.props.categories.forEach((category) => {	
			const categoryAmount = document.getElementById(`newTransaction${category}Box`).value;
			
			budgetCategories.push({
				name : category,
				amount: categoryAmount
			});
		});
		
		this.props.onSubmit(budgetCategories);
	};
	
    return (
		<Modal show={this.props.show} onHide={this.props.onCancel}>
			<Modal.Header closeButton>
				<Modal.Title>Add New Budget</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					{ this.props.categories && this.props.categories.map(mapCategoriestoFormFields) }
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={this.props.onCancel}>
					Close
				</Button>
				<Button type="submit" variant="primary" onClick={handleSubmit}>
					Add Budget
				</Button>
			</Modal.Footer>
		</Modal>
    );
  }
}

export default AddBudgetModal;



