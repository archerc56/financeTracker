import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import firebase from "../firebase";
import DatabaseUtil from "./../Database/DatabaseUtil";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleRegister = this.handleRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      loginEmail: "",
      loginPassword: "",
      registerEmail: "",
      registerPassword: ""
    };
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleLogin(event) {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(
        this.state.loginEmail,
        this.state.loginPassword
      )
      .catch(error => {
        console.log("error: ", error);
      })
      .then(console.log("successfully logged in"));
  }

  handleRegister(event) {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.state.registerEmail,
        this.state.registerPassword
      ).then(function(){
        DatabaseUtil.createUserDatabaseEntry();
      }).catch(alert);
  }
  render() {
    return (
      <div>
      <Container >
        <Jumbotron className="shadow p-5 mb-2 bg-dark text-white text-center ">
          <h1>Welcome to Finance Tracker</h1>
          <h4>Please Login or Create an Account</h4>
        </Jumbotron>
        <Form.Row>
          <Col className="shadow  p-5 mb-2 bg-secondary text-light text-center">
            <h2>Login</h2>
            <Form>
              <Form.Row className="formRow">
                <Form.Control
                  value={this.state.loginEmail}
                  name="loginEmail"
                  type="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                />
              </Form.Row>
              <Form.Row className="formRow">
                <Form.Control
                  value={this.state.loginPassword}
                  name="loginPassword"
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </Form.Row>

              <div className="buttonRow">
                <Button
                  className="loginButton"
                  variant="info"
                  onClick={this.handleLogin}
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </Form>
          </Col>
          <Col className="shadow p-5 mb-2 bg-light text-secondary text-center">
            <h2>Create Account</h2>
            <Form onSubmit={this.handleRegister}>
              <Form.Row className="formRow">
                <Form.Control
                  value={this.state.registerEmail}
                  name="registerEmail"
                  type="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                />
              </Form.Row>
              <Form.Row className="formRow">
                <Form.Control
                  value={this.state.registerPassword}
                  name="registerPassword"
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </Form.Row>
              <div className="buttonRow">
                <Button className="loginButton" variant="info" type="submit">
                  Create Account
                </Button>
              </div>
            </Form>
          </Col>
        </Form.Row>
      </Container>
      </div>
    );
  }
}
export default Login;
