import React, { Component } from 'react';
import Registration from './Containers/Registration/Registration';
import { Route, Switch } from 'react-router-dom';
import Login from './Containers/Login/Login';
import Profile from './Containers/Profile/Profile';
import Weight from './Containers/Weight/Weight';
import Meal from './Containers/Meal/Meal';
import Activity from './Containers/Activity/Activity';
import Dashborad from './Containers/Dashboard/Dashboard';
import { connect } from 'react-redux'
import './App.css'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>


          {this.props.token ? <Route exact path="/profile" component={Profile} /> : null}
          {this.props.token ? <Route path="/profile/dashboard" component={Dashborad} /> : null}
          {this.props.token ? <Route path="/weight" component={Weight} /> : null}
          {this.props.token ? <Route path="/activity" component={Activity} /> : null}
          {this.props.token ? <Route path="/meal" component={Meal} /> : null}
          <Route path="/registration" component={Registration} />
          <Route exact path="/" component={Login} />
          <Route component={Login} />


        </Switch>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.idToken
  }
}

export default connect(mapStateToProps)(App);
