import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Jumbotron from 'react-bootstrap/Jumbotron';
import firebase from "./firebase";
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: null
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin = (event) => {
    event.preventDefault();
    let form = event.target
    let emailVal = form.elements.loginEmail.value;
    let passwordVal = form.elements.loginPassword.value;
    firebase
      .auth()
      .signInWithEmailAndPassword(emailVal, passwordVal)
      .catch(error => {
        this.setState({ error: error });
        alert(error);
      });

    this.props.history.push('/');
  };

  handleRegister = (event) => {
    event.preventDefault();
    let form = event.target
    let emailVal = form.elements.registerEmail.value;
    let passwordVal = form.elements.registerPassword.value;
    firebase.auth().createUserWithEmailAndPassword(emailVal, passwordVal).then(function (user) {
      // get user data from the auth trigger
      const userUid = user.user.uid; // The UID of the user.
      var docData = {
        stringExample: "Hello world!",
        booleanExample: true,
        numberExample: 3.14159265,
        dateExample: firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815")),
        arrayExample: [5, true, "hello"],
        nullExample: null,
        objectExample: {
          a: 5,
          b: {
            nested: "foo"
          }
        }
      };
      //Create a new entry in the database. 
      //TODO: revisit to potentially create a collection per user
      firebase.firestore().collection('users').doc(userUid).collection('Transactions').doc(userUid).set(docData);
    }).catch(alert);
    this.props.history.push('/');
  }
  render() {
    return (
      <Container>
        <Jumbotron className="welcomeMessage">
          <h1>Welcome to FinanceTool</h1>
          <h4>Please Login or Create an Account</h4>
        </Jumbotron>
        <Form.Row>

          <Col className="loginCol">
            <h2>Login</h2>
            <Form onSubmit={this.handleLogin}>
              <Form.Row className="formRow">
                <Form.Control
                  name="loginEmail"
                  type="email"
                  placeholder="Email" />
              </Form.Row>
              <Form.Row className="formRow">
                <Form.Control onChange={e => this.setState({ password: e.target.value })}
                  name="loginPassword"
                  type="password"
                  placeholder="Password" />
              </Form.Row>

              <div className="buttonRow">
                <Button className="loginButton"
                  variant="primary"
                  type="submit">Login
                </Button>
              </div>
            </Form>
          </Col>
          <Col className="registerCol">
            <h2>Create Account</h2>
            <Form onSubmit={this.handleRegister}>
              <Form.Row className="formRow">
                <Form.Control
                  name="registerEmail"
                  type="email"
                  placeholder="Email" />
              </Form.Row>
              <Form.Row className="formRow">
                <Form.Control onChange={e => this.setState({ password: e.target.value })}
                  name="registerPassword"
                  type="password"
                  placeholder="Password" />
              </Form.Row>
              <div className="buttonRow">
                <Button className="loginButton"
                  variant="primary"
                  type="submit">Create Account
                </Button>
              </div>
            </Form>
          </Col>
        </Form.Row>
      </Container>
    );
  }
}
export default withRouter(Login);
