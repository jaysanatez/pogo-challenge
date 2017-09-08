import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Profile extends Component {
  render() {
  	const { trainer } = this.props

    if (!trainer) {
      return null
    }

    return (
      <div>
        <h1>PROFILE</h1>
        <h3>{ trainer.username }</h3>
      </div>
    )
  }
}

Profile.propTypes = {
 trainer: PropTypes.object,
}
