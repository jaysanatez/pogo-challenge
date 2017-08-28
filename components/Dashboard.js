import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Dashboard extends Component {
  render() {
    var data = this.props.onDashboardLoad()
    return (
      <div/>
    )
  }
}

Dashboard.PropTypes = {
  onDashboardLoad: PropTypes.func.isRequired,
}
