import React, { Component } from 'react';
import  {BrowserRouter as Router, Route, Switch, Redirect}  from 'react-router-dom';
import Login from './Login';
import NavLink from 'react-bootstrap/NavLink';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
class Navigation extends Component {
 render() {
   return (
     <Router>
       <Switch>
                   
          
            <Route path="/login" component={Login} />
           <ProtectedRoute path="/" isAuth={this.props.isAuth}component={Dashboard} />
         </Switch>
     </Router>
   );
 }
}
export default Navigation;