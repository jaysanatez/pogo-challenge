import React, { Component } from 'react'
import PropTypes from 'prop-types'

import LevelUpComponent from './LevelUpComponent'
import XPGraph from './XPGraph'
import CatchMap from './CatchMap'

export default class Dashboard extends Component {
  render() {
    const { trainer, catches } = this.props
    if (!trainer) {
      return null
    }

    const updates = trainer.xpUpdates || []
    return (
      <div className="mt-3">
        <XPGraph updates={updates}/>
        <LevelUpComponent updates={updates}/>
        <CatchMap trainer={trainer} catches={catches}/>
      </div>
    )
  }
}

Dashboard.propTypes = {
  trainer: PropTypes.object,
  catches: PropTypes.array.isRequired,
}
