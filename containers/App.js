import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Navbar from '../components/Navbar/Navbar'
import Dashboard from '../components/Dashboard'
import Trainers from '../components/Trainers'
import Verify from '../components/Verify'
import LoginScreen from '../components/LoginScreen'
import NotFound from '../components/NotFound'

import { mapStateToProps, mapDispatchToProps } from './appMaps'

class App extends Component {
  render() {
    const {
      trainer,
      onLoginClick,
      onLogoutClick,
    } = this.props

    const authorize = (Component) => {
      return () => {
        return trainer ? <Component {...this.props} /> : <Redirect to="/login"/>
      }
    }

    const unauthorize = (Component) => {
      return () => {
        return trainer ? <Redirect to="/"/> : <Component {...this.props} />  
      }
    }

    const renderVerifyPage = (props) => {
      const trainerId = props.match.params.trainerId
      if (this.props.trainer || !trainerId) {
        return <Redirect to="/"/>
      }

      return (
        <Verify 
          {...this.props}
          trainerId={trainerId}
        />
      )
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
              <Route path="/trainers" render={authorize(Trainers)}/>
              <Route path="/verify/:trainerId" render={renderVerifyPage}/>
              <Route path="/login" render={unauthorize(LoginScreen)}/>
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
  ensureResult: PropTypes.object,
  verifyResult: PropTypes.object,
  onLoginClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  fetchTrainers: PropTypes.func.isRequired,
  onTrainerCreate: PropTypes.func.isRequired,
  onTrainerDelete: PropTypes.func.isRequired,
  ensureTrainer: PropTypes.func.isRequired,
  verifyTrainer: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
