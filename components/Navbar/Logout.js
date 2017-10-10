import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NavAuthButton from './NavAuthButton'

export default class Logout extends Component {
  render() {
    return (
      <form className="form-inline my-2 my-lg-0">
        <label className="mr-sm-2">{this.props.name}</label>
        <NavAuthButton text="Logout" type="button" onClick={this.props.onLogoutClick}/>
      </form>
    )
  }
}

Logout.propTypes = {
  name: PropTypes.string,
  onLogoutClick: PropTypes.func.isRequired,
}
