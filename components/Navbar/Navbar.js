import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import Login from './Login'
import Logout from './Logout'
import { Role } from '../../server/lookups'

export default class Navbar extends Component {

  renderTabComponents() {
    const { user } = this.props;

    if (!user || user.role != Role.ADMIN) {
      return null;
    }

    return (
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item active"><Link to="/trainers" className="nav-link">Trainers</Link></li>
      </ul>
    )
  }

  renderAuthComponents() {
    const {
      user,
      onLoginClick,
      onLogoutClick,
    } = this.props

    if (user) {
      return ( <Logout name={user.username} onLogoutClick={onLogoutClick} /> )
    } else {
      return ( <Login onLoginClick={onLoginClick} />)
    }
  }

  render() {
    return (
    <nav className="navbar navbar-light navbar-toggleable-md bg-faded justify-content-center">
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
        <span className="navbar-toggler-icon"></span>
      </button>

      <Link to="/" className="navbar-brand">PoGo Challenge</Link>
      <div className="navbar-collapse collapse" id="collapsingNavbar">
        { this.renderTabComponents() }
        { this.renderAuthComponents() }
      </div>
    </nav>
    )
  }

}

Navbar.propTypes = {
  user: PropTypes.object,
  onLoginClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
}