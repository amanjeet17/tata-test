import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';


import PrivateRoute from './common/PrivateRoute';

import Navbar from './layout/Navbar';
import Landing from './layout/Landing';
import Register from './auth/Register';
import Login from './auth/Login';
import Dashboard from './dashboard/Dashboard';
import AdminDashboard from './admindashboard/AdminDashboard';
import NotFound from './not-found/NotFound';

import '../App.css';


class Container extends Component {

  render() {
    const { role } = this.props.currentUser
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              {role === "admin" && <PrivateRoute exact path="/Admindashboard" component={AdminDashboard} />}
              {role === "admin" && <PrivateRoute exact path="/Admindashboard/profile" component={Dashboard} />}
              {role !== "admin" && <PrivateRoute exact path="/Userdashboard" component={Dashboard} />}
              <PrivateRoute exact path="*" component={NotFound} />
            </Switch>
            <Route exact path="/not-found" component={NotFound} />
          </div>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
  }
}
export default connect(mapStateToProps)(Container);
