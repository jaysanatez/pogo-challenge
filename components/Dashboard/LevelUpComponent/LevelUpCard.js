import React, { Component } from 'react'
import PropTypes from 'prop-types'
import commaNumber from 'comma-number'

import { calculateLevelUpData } from './levelUpCalculator'

export default class LevelUpCard extends Component {
  render() {
    const { trainer, lastN, showHeader } = this.props
    const data = calculateLevelUpData(trainer.xpUpdates, lastN)
    const header = showHeader ? <h5>{trainer.username}</h5> : null
    const blockStyle = showHeader ? { marginLeft: "30px", marginRight: "30px" } : {}

    return (
      <div className="card-block" style={blockStyle}>
        { header }
        <div className="row">
          <div className="col">Next Level: { data.nextLevel }</div>
          <div className="col">Progress to Level { data.nextLevel}: { data.percentTowardsNextLevel }</div>
        </div>
        <div className="row">
          <div className="col">Daily Average: { commaNumber(data.dailyAvg) }</div>
          <div className="col">Days Until Level Up: { data.daysTilNextLevel }</div>
        </div>
        <div className="row">
          <div className="col">XP Needed for Next Level: { commaNumber(data.xpTilNextLevel) }</div>
          <div className="col">Projected Level Up on { data.projectedLevelUpDate }</div>
        </div>
      </div>
    )
  }
}

LevelUpCard.propTypes = {
  trainer: PropTypes.object.isRequired,
  lastN: PropTypes.number.isRequired,
  showHeader: PropTypes.bool.isRequired,
}
