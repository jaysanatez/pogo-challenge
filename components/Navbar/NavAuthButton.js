import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NavAuthButton extends Component {
  render() {
    const { text, type, onClick } = this.props
    return (
      <button
        className="btn my-sm-0"
        type={type}
        onClick={onClick}
        style={{cursor:"pointer"}}
      >
       { text }
      </button>
    )
  }
}

NavAuthButton.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}
