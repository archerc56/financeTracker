import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase";
import Dashboard from "./Dashboard";
import Login from "./Login";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  }

  render() {
    if (this.state.user) {
      return (
        <div>
          <Dashboard />
        </div>
      );
    } else {
      return (
          
        <div>
          <Login />
        </div>
      );
    }
  }
}

export default App;
