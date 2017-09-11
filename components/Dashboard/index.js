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

    
    return (
      <div className="mt-3">
        <XPGraph updates={trainer.xpUpdates}/>
        <LevelUpComponent updates={trainer.xpUpdates}/>
      </div>
    )
  }
}

Dashboard.propTypes = {
  trainer: PropTypes.object,
}
