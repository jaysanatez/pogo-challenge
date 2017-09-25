import React, { Component } from 'react'
import PropTypes from 'prop-types'
import commaNumber from 'comma-number'

import { calculateLevelUpData } from './levelUpCalculator'
import {
  LONG_DATE_STRING,
  getTrainerLevel,
} from '../../shared/utils'

const lastN = 7
export default class LevelUpComponent extends Component {
  render() {
    const { updates } = this.props

    const trainerLevel = getTrainerLevel({ xpUpdates: updates })
    if (!trainerLevel || trainerLevel == 40) {
      return null
    }

    const data = calculateLevelUpData(updates, lastN)
    return (
      <div className="mt-3">
        <div className="card mt-3">
          <div className="card-header">Level Up Projections ({ lastN }-day moving average)</div>
          <div className="card-block">
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
        </div>
      </div>
    )
  }
}

LevelUpComponent.propTypes = {
  updates: PropTypes.array.isRequired,
}