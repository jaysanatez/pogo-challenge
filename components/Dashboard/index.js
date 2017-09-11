import React, { Component } from 'react'
import PropTypes from 'prop-types'

import LevelUpComponent from './LevelUpComponent'
import XPGraph from './XPGraph'

export default class Dashboard extends Component {
  render() {
    const { trainer } = this.props
    if (!trainer) {
      return null
    }

    const updates = trainer.xpUpdates || []
    return (
      <div className="mt-3">
        <XPGraph updates={updates}/>
        <LevelUpComponent updates={updates}/>
      </div>
    )
  }
}

Dashboard.propTypes = {
  trainer: PropTypes.object,
}
