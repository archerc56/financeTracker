import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class AddAccountModal extends Component {
  constructor() {
    super();
    this.state = { };
  }
  render() {
	  
	const handleSubmit = event => {
			const name = document.getElementById("newAccountNameBox").value
			this.props.onSubmit(name);
	};
	
    return (
		<Modal show={this.props.show} onHide={this.props.onCancel}>
			<Modal.Header closeButton>
				<Modal.Title>Add New Account</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group as={Row} controlId="formHorizontalAccountName">
					<Form.Label column sm={2}>
					  Account Name
					</Form.Label>
					<Col sm={10}>
					  <Form.Control id='newAccountNameBox' />
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

export default AddAccountModal;



