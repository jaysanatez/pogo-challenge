import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import Login from './Login'
import Logout from './Logout'
import { Role, Status } from '../../shared/lookups'

export default class Navbar extends Component {

  createTab(text, linkTo) {
    return (
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item active"><Link to={linkTo} className="nav-link">{text}</Link></li>
      </ul>
    )
  }

  renderProfileTab() {
    return this.props.trainer ? this.createTab('Profile', '/profile') : null
  }

  renderTrainersTab() {
    const { trainer } = this.props
    const hasPerms = trainer && trainer.role == Role.ADMIN
    return hasPerms ? this.createTab('Trainers', '/trainers') : null
  }

  renderAuthComponents() {
    const {
      trainer,
      onLoginClick,
      onLogoutClick,
    } = this.props

    if (trainer && trainer.status == Status.VERIFIED) {
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
