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
    return (
      <ul className="nav navbar-nav ml-auto w-100 justify-content-end">
        <form className="form-inline my-2 my-lg-0" onSubmit={e => e.preventDefault()}>
          <input className="form-control mr-sm-2" type="text" ref="username" placeholder="Username"/>
          <input className="form-control mr-sm-2" type="password" ref="password" placeholder="Password"/>
          <button
            className="btn my-sm-0"
            type="submit"
            onClick={ this.onClick.bind(this)}
            style={{cursor:"pointer"}}
          >
            Login
          </button>
        </form>
      </ul>
    )
  }
}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
}
