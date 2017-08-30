import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Logout extends Component {
  onClick(event) {
    this.props.onLogoutClick()
  }

  render() {
    return (
      <ul className="nav navbar-nav ml-auto w-100 justify-content-end">
        <form className="form-inline my-2 my-lg-0">
          <label className="mr-sm-2">{this.props.name}</label>
          <button
            className="btn m-2 my-sm-0"
            type="button"
            onClick={(event) => this.onClick(event)}
            style={{cursor:"pointer"}}
          >
            Logout
          </button>
        </form>
      </ul>
    )
  }
}

Logout.propTypes = {
  name: PropTypes.string,
  onLogoutClick: PropTypes.func.isRequired,
}