import React, { Component } from 'react'

export default class LoginScreen extends Component {
  render() {
    const { message } = this.props
    const flash = message ? (<h3> { message } </h3>) : null

    return (
      <div>
        <h1>LOGIN SCREEN</h1>
        { flash }
      </div>
    )
  }
}
