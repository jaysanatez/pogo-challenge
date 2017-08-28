import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Logout extends Component {
  onClick(event) {
    this.props.onLogoutClick()
  }

  render() {
    const { name } = this.props
    const greeting = name ? ('Hello, ' + name + '!') : ''
    const style = {
      margin: '3px',
    }

    return (
      <div className="navbar-right">
        <span style={style}> { greeting } </span>
        <button onClick={(event) => this.onClick(event)} className="btn btn-primary">
          Logout
        </button>
      </div>
    )
  }
}

Logout.propTypes = {
  name: PropTypes.string,
  onLogoutClick: PropTypes.func.isRequired,
}