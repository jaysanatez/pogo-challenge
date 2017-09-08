import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Navbar from '../components/Navbar/Navbar'
import Dashboard from '../components/Dashboard'
import LoginScreen from '../components/LoginScreen'
import Trainers from '../components/Trainers'
import Verify from '../components/Verify'
import Profile from '../components/Profile'
import NotFound from '../components/NotFound'

import { Status, Role } from '../server/lookups'
import { mapStateToProps, mapDispatchToProps } from './appMaps'

class App extends Component {
  render() {
    const {
      trainer,
      onLoginClick,
      onLogoutClick,
    } = this.props

    const isVerifiedTrainer = t => {
      return t && t.status == Status.VERIFIED
    }

    // leave roles undefined if all roles can visit page
    const authorize = (Component, roles) => {
      return (props) => {
        if (!isVerifiedTrainer(trainer))
          return <Redirect to="/login"/>

        // to prevent self redirection
        if (Component == Dashboard)
          return <Component {...this.props} {...props} />

        const meetsRoleReqs = !roles || roles.indexOf(trainer.role) > -1
        return meetsRoleReqs ? <Component {...this.props} {...props} /> : <Redirect to="/"/>
      }
    }

    const unauthorize = (Component) => {
      return (props) => {
        return isVerifiedTrainer(trainer) ? <Redirect to="/"/> : <Component {...this.props} {...props} />  
      }
    }

    return (
      <BrowserRouter>
        <div>
          <Navbar
            trainer={trainer}
            onLoginClick={onLoginClick}
            onLogoutClick={onLogoutClick}
          />
          <div className="container">
            <Switch>
              <Route exact path="/" render={authorize(Dashboard)}/>
              <Route path="/login" render={unauthorize(LoginScreen)}/>
              <Route path="/trainers" render={authorize(Trainers, [Role.ADMIN])}/>
              <Route path="/verify/:trainerId" render={unauthorize(Verify)}/>
              <Route path="/profile" render={authorize(Profile)}/>
              <Route path="*" render={authorize(NotFound)}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

App.propTypes = {
  trainer: PropTypes.object,
  message: PropTypes.string,
  trainers: PropTypes.array.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  fetchTrainers: PropTypes.func.isRequired,
  onTrainerCreate: PropTypes.func.isRequired,
  onTrainerDelete: PropTypes.func.isRequired,
  verifyTrainer: PropTypes.func.isRequired,
  fetchTrainer: PropTypes.func.isRequired,
  setVerifyStatus: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
