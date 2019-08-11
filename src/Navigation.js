import React, { Component } from 'react';
import  {BrowserRouter as Router, Route, Switch}  from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
class Navigation extends Component {
 render() {
   return (
     <Router>
       <div>
        <Switch>
           <Route exact path="/login" component={Login} />
           <ProtectedRoute exact path="/" component={Dashboard} authenticated={this.props.authenticated}/>
         </Switch>
       </div>
     </Router>
   );
 }
}
export default Navigation;