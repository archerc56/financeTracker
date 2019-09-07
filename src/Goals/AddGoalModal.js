import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class AddGoalModal extends Component {
  constructor() {
    super();
    this.state = { };
  }
  render() {
	  
	const handleSubmit = event => {
			const description = document.getElementById('newGoalDescriptionBox').value
			this.props.onSubmit(description);
	};
	
    return (
		<Modal show={this.props.show} onHide={this.props.onCancel}>
			<Modal.Header closeButton>
				<Modal.Title>Add New Goal</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group as={Row} controlId='formHorizontalGoalDescription'>
						<Col sm={2}>
							<Form.Label>
							  Goal Description
							</Form.Label>
						</Col>
						<Col sm={10}>
							<Form.Control as="textarea" rows="5" id='newGoalDescriptionBox' />
						</Col>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={this.props.onCancel}>
					Close
				</Button>
				<Button type='submit' variant='primary' onClick={handleSubmit}>
					Save Goal
				</Button>
			</Modal.Footer>
		</Modal>
    );
  }
}

export default AddGoalModal;



