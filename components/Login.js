import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Login extends Component {
  onClick(event) {
    const { username, password } = this.refs
    const creds = { 
      username: username.value.trim(),
      password: password.value.trim(),
    }
    
    this.props.onLoginClick(creds)
  }

  render() {
    const style = {
      margin: '3px',
    }

    return (
      <div className="navbar-right">
        <input type='text' ref='username' className="form-control" style={style} placeholder='Username'/>
        <input type='password' ref='password' className="form-control" style={style} placeholder='Password'/>
        <button onClick={(event) => this.onClick(event)} className="btn btn-primary" style={style}>
          Login
        </button>
      </div>
    )
  }
}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
}