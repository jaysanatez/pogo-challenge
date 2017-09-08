import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import Login from './Login'
import Logout from './Logout'
import { Role, Status } from '../../server/lookups'

export default class Navbar extends Component {

  renderProfileTab() {
    const { trainer } = this.props
    if (!trainer) {
      return null
    }

    return (
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item active"><Link to="/profile" className="nav-link">Profile</Link></li>
      </ul>
    )
  }

  renderTrainersTab() {
    const { trainer } = this.props
    if (!trainer || trainer.role != Role.ADMIN.key) { // only for admins
      return null
    }

    return (
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item active"><Link to="/trainers" className="nav-link">Trainers</Link></li>
      </ul>
    )
  }

  renderAuthComponents() {
    const {
      trainer,
      onLoginClick,
      onLogoutClick,
    } = this.props

    if (trainer && trainer.status == Status.VERIFIED.key) {
      return ( <Logout name={trainer.username} onLogoutClick={onLogoutClick} /> )
    } else {
      return ( <Login onLoginClick={onLoginClick} />)
    }
  }

  render() {
    return (
    <nav className="navbar navbar-light navbar-toggleable-md bg-faded justify-content-center mb-2">
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
        <span className="navbar-toggler-icon"></span>
      </button>

      <Link to="/" className="navbar-brand">PoGo Challenge</Link>
      <div className="navbar-collapse collapse" id="collapsingNavbar">
        { this.renderProfileTab() }
        { this.renderTrainersTab() }
        { this.renderAuthComponents() }
      </div>
    </nav>
    )
  }

}

Navbar.propTypes = {
  trainer: PropTypes.object,
  onLoginClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
}
