import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Navbar from '../components/Navbar/Navbar'
import Dashboard from '../components/Dashboard'
import Trainers from '../components/Trainers'
import LoginScreen from '../components/LoginScreen'
import NotFound from '../components/NotFound'

import { mapStateToProps, mapDispatchToProps } from './appMaps'

class App extends Component {
  render() {
    const {
      user,
      onLoginClick,
      onLogoutClick,
    } = this.props

    const authorize = (Component) => {
      return () => {
        return user ? <Component {...this.props} /> : <Redirect to="/login"/>
      }
    }

    const unauthorize = (Component) => {
      return () => {
        return user ? <Redirect to="/"/> : <Component {...this.props} />  
      }
    }

    return (
      <BrowserRouter>
        <div>
          <Navbar
            user={user}
            onLoginClick={onLoginClick}
            onLogoutClick={onLogoutClick}
          />
          <div className="container">
            <Switch>
              <Route exact path="/" render={authorize(Dashboard)}/>
              <Route path="/trainers" render={authorize(Trainers)}/>
              <Route path="/login" render={unauthorize(LoginScreen)}/>
              <Route path="*" component={NotFound}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

App.propTypes = {
  user: PropTypes.object,
  message: PropTypes.string,
  trainers: PropTypes.array.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  fetchTrainers: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
