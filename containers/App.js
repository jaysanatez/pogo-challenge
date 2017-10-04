import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import LoginScreen from '../components/LoginScreen'
import Trainers from '../components/Trainers'
import Verify from '../components/Verify'
import Profile from '../components/Profile'
import Pokedex from '../components/Pokedex'
import NotFound from '../components/NotFound'
import LoadingThrobber from '../components/shared/LoadingThrobber'

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
      trainers,
      catches,
      fetchCurrentTrainer,
      fetchCatches,
      fetchTrainers,
    } = this.props

    if (this.isVerifiedTrainer(trainer) && (!trainer.xpUpdates || !trainer.pokedex)) {
      fetchCurrentTrainer()
      return (<LoadingThrobber/>)
    }

    if (this.isVerifiedTrainer(trainer) && !catches) {
      fetchCatches()
      return (<LoadingThrobber/>)
    }

    if (this.isVerifiedTrainer(trainer) && !trainers.length) {
      fetchTrainers()
      return (<LoadingThrobber/>)
    }

    // reflect trainer state changes back to trainers state
    const me = trainers.findIndex(t => t._id == trainer._id)
    if (me >= 0)
      trainers[me] = trainer

    return (
      <Switch>
        <Route exact path="/" render={this.authorize(Dashboard)}/>
        <Route path="/login" render={this.unauthorize(LoginScreen)}/>
        <Route path="/trainers" render={this.authorize(Trainers, [Role.ADMIN])}/>
        <Route path="/verify/:trainerId" render={this.unauthorize(Verify)}/>
        <Route path="/profile" render={this.authorize(Profile)}/>
        <Route path="/pokedex" render={this.authorize(Pokedex)}/>
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
  mapScope: PropTypes.string.isRequired,
  userScope: PropTypes.string.isRequired,
  pokedexPage: PropTypes.object.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  fetchTrainers: PropTypes.func.isRequired,
  onTrainerCreate: PropTypes.func.isRequired,
  onTrainerDelete: PropTypes.func.isRequired,
  verifyTrainer: PropTypes.func.isRequired,
  fetchTrainer: PropTypes.func.isRequired,
  fetchCurrentTrainer: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  setMapScope: PropTypes.func.isRequired,
  setUserScope: PropTypes.func.isRequired,
  setPokedexPage: PropTypes.func.isRequired,
  onXPUpdate: PropTypes.func.isRequired,
  onCatchCreate: PropTypes.func.isRequired,
  fetchCatches: PropTypes.func.isRequired,
  onAddPokedex: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
