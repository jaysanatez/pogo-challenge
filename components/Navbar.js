import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Login from './Login'
import Logout from './Logout'

export default class Navbar extends Component {
  renderAuthComponents() {
    const {
      user,
      isAuthenticated,
      onLoginClick,
      onLogoutClick,
    } = this.props

    if (isAuthenticated) {
      return ( <Logout name={user.username} onLogoutClick={onLogoutClick} /> )
    } else {
      return ( <Login onLoginClick={onLoginClick} />)
    }
  }

  render() {

    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <a className="navbar-brand" href="#">PoGo Challenge</a>
          <div className='navbar-form'>
            { this.renderAuthComponents() }
          </div>
        </div>
      </nav>
    )
  }

}

Navbar.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
}