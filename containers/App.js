import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Navbar from '../components/Navbar'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import Trainers from '../components/Trainers'
import NotFound from '../components/NotFound'

import { mapStateToProps, mapDispatchToProps } from './appMaps'

class App extends Component {
  render() {
    const {
      user,
      onLoginClick,
      onLogoutClick,
    } = this.props

    return (
      <BrowserRouter>
        <div>
          <Navbar
            user={user}
            onLoginClick={onLoginClick}
            onLogoutClick={onLogoutClick}
          />
          <div className='container'>
            <Switch>
              <Route exact path="/" component={Dashboard}/>
              <Route path="/Trainers" component={Trainers}/>
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
  onLoginClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)