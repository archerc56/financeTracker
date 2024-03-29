import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";

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
          
        <div className="bg">
          <Login />
        </div>
      );
    }
  }
}

export default App;
