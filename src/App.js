import React, { Component } from 'react';
import Navigation from './Navigation';
import firebase from './firebase';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor() {
    super();
    this.state = { tabIndex: 0, authenticated: false, };
  }
  
  componentDidMount() {
     firebase.auth().onAuthStateChanged((authenticated) => {
      authenticated
        ? this.setState(() => ({
            authenticated: true,
          }))
        : this.setState(() => ({
            authenticated: false,
          }));
    });

  }
   
  render() {
    return <Navigation authenticated={this.state.authenticated} />;
  }
}

export default App;