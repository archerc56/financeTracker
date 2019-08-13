import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import firebase from "../firebase";
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
      )
      .then(function(user) {
        // get user data from the auth trigger
        const userUid = user.user.uid; // The UID of the user.
        var docData = {
          stringExample: "Hello world!",
          booleanExample: true,
          numberExample: 3.14159265,
          dateExample: firebase.firestore.Timestamp.fromDate(
            new Date("December 10, 1815")
          ),
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
        firebase
          .firestore()
          .collection("users")
          .doc(userUid)
          .collection("Transactions")
          .doc(userUid)
          .set(docData);
      })
      .catch(alert);
  }
  render() {
    return (
      <div>
      <Container >
        <Jumbotron className="shadow p-5 mb-2 bg-dark text-white text-center ">
          <h1>Welcome to FinanceTool</h1>
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
