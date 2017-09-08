import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class LoginScreen extends Component {
  render() {
    const { message } = this.props
    const flash = message ? (
      <div className="alert alert-danger" role="alert">
        { message }
      </div>
    ) : null

    return (
      <div>
        { flash }
        <div className="jumbotron">
          <h1>Login to begin.</h1>
        </div>
      </div>
    )
  }
}

LoginScreen.propType = {
  message: PropTypes.string,
}
