import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'

import { mapStateToProps, mapDispatchToProps } from './appMaps'

class App extends Component {
  renderContent(isAuthenticated) {
    if (!isAuthenticated) {
      return null;
    }

    return (
      <Dashboard 
        onDashboardLoad={this.props.onDashboardLoad}
      />
    )
  }

  render() {
    const {
      user,
      isAuthenticated,
      onLoginClick,
      onLogoutClick,
      onDashboardLoad,
    } = this.props

    return (
      <div>
        <Navbar
          user={user}
          isAuthenticated={isAuthenticated}
          onLoginClick={onLoginClick}
          onLogoutClick={onLogoutClick}
        />
        <div className='container'>
          { this.renderContent(isAuthenticated) }
        </div>
      </div>
    )
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)