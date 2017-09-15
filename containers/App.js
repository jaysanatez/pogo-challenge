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

import { Status, Role } from '../shared/lookups'
import { mapStateToProps, mapDispatchToProps } from './appMaps'

class App extends Component {
  isVerifiedTrainer(t) {
    return t && t.status == Status.VERIFIED
  }

  // leave roles undefined if all roles can visit page
  authorize(Component, roles) {
    const { trainer } = this.props
    return (props) => {
      if (!this.isVerifiedTrainer(trainer))
        return <Redirect to="/login"/>

      // to prevent self redirection
      if (Component == Dashboard)
        return <Component {...this.props} {...props} />

      const meetsRoleReqs = !roles || roles.indexOf(trainer.role) > -1
      return meetsRoleReqs ? <Component {...this.props} {...props} /> : <Redirect to="/"/>
    }
  }

  unauthorize(Component) {
    const { trainer } = this.props
    return (props) => {
      return this.isVerifiedTrainer(trainer) ? <Redirect to="/"/> : <Component {...this.props} {...props} />
    }
  }

  renderBody() {
    const {
      trainer,
      catches,
      fetchCurrentTrainer,
      fetchCatches,
    } = this.props

    if (trainer && !trainer.xpUpdates) {
      fetchCurrentTrainer()
      return (
        <div className="mt-3">
          <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: "48px" }}></i>
        </div>
      )
    }

    if (trainer && !catches) {
      fetchCatches()
      return (
        <div className="mt-3">
          <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: "48px" }}></i>
        </div>
      )
    }

    return (
      <Switch>
        <Route exact path="/" render={this.authorize(Dashboard)}/>
        <Route path="/login" render={this.unauthorize(LoginScreen)}/>
        <Route path="/trainers" render={this.authorize(Trainers, [Role.ADMIN])}/>
        <Route path="/verify/:trainerId" render={this.unauthorize(Verify)}/>
        <Route path="/profile" render={this.authorize(Profile)}/>
        <Route path="*" render={this.authorize(NotFound)}/>
      </Switch>
    )
  }

  render() {
    const {
      trainer,
      onLoginClick,
      onLogoutClick,
    } = this.props

    return (
      <BrowserRouter>
        <div>
          <Navbar
            trainer={trainer}
            onLoginClick={onLoginClick}
            onLogoutClick={onLogoutClick}
          />
          <div className="container">
            { this.renderBody() }
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
  catches: PropTypes.array,
  onLoginClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  fetchTrainers: PropTypes.func.isRequired,
  onTrainerCreate: PropTypes.func.isRequired,
  onTrainerDelete: PropTypes.func.isRequired,
  verifyTrainer: PropTypes.func.isRequired,
  fetchTrainer: PropTypes.func.isRequired,
  fetchCurrentTrainer: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  onXPUpdate: PropTypes.func.isRequired,
  onCatchCreate: PropTypes.func.isRequired,
  fetchCatches: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
