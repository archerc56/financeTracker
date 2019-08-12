import React, { Component } from 'react';
import  {BrowserRouter, Route, Switch, Redirect}  from 'react-router-dom';
import firebase from './firebase';
import Login from './Login';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import './App.css';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor() {
    super();
    this.state = { isAuth: false};
    firebase.auth().onAuthStateChanged(user => {
      console.log("state changed");
      this.setState({
        loading: false,  // For the loader maybe
        user, // User Details
        isAuth: true
      });
      
    });
  }
  // componentWillReceiveProps (nextProps){
  //   console.log('componentWillReceiveProps', nextProps);
  //       this.setState(nextProps);
  // }

  shouldComponentUpdate (nextProps, nextState){
    console.log('shouldComponentReceiveProps', nextProps);
    return true;

    
  }   

  render() {
    if(this.state.isAuth == true){
      return <BrowserRouter><Redirect to='/' /><Dashboard></Dashboard></BrowserRouter>
    }
    return <Navigation isAuth={this.state.isAuth} />;
  }
}

export default App;