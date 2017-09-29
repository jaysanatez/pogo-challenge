import React, { Component } from 'react'
import PropTypes from 'prop-types'
import commaNumber from 'comma-number'

export default class LevelUpCard extends Component {
  render() {
    const { data, showHeader } = this.props
    const header = showHeader ? (<h5>Jake</h5>) : null
    return (
      <div className="card-block" style={{ marginLeft: "30px", marginRight: "30px" }}>
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
  data: PropTypes.object.isRequired,
  showHeader: PropTypes.bool.isRequired,
}