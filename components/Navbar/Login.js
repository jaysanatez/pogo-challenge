import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NavAuthButton from './NavAuthButton'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

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
      <form className="form-inline my-2 my-lg-0" onSubmit={e => e.preventDefault()}>
        <input className="form-control mr-sm-2" type="text" ref="username" placeholder="Username"/>
        <input className="form-control mr-sm-2" type="password" ref="password" placeholder="Password"/>
        <NavAuthButton text="Login" type="submit" onClick={this.onClick}/>
      </form>
    )
  }
}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
}
