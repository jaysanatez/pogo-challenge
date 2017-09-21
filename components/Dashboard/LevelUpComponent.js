import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'
import commaNumber from 'comma-number'
import toPercentage from 'to-percentage'

import {
  LONG_DATE_STRING,
  minXPForLevel,
  getLevelForXP,
  getTrainerLevel,
} from '../../shared/utils'

const lastN = 7

export default class LevelUpComponent extends Component {
  calcXpTilNextLevel(xp) {
    const level = parseInt(getLevelForXP(xp))
    const nextLevel = level + 1
    const currentLevelXp = minXPForLevel[level]
    const rawPercent = (xp - currentLevelXp) / (minXPForLevel[nextLevel] - currentLevelXp)

    return {
      nextLevel,
      xpTilNextLevel: minXPForLevel[nextLevel] - xp,
      percentTowardsNextLevel: toPercentage(rawPercent, 1)
    }
  }

  createLevelUpData(updates) {
    updates.sort((u1, u2) => {
      return new Date(u1.date) - new Date(u2.date)
    })

    const num = Math.min(lastN, updates.length)
    const lastNUpdates = updates.slice(updates.length - num)

    const dailyAvg = parseInt((lastNUpdates[num - 1].value - lastNUpdates[0].value) / (num - 1))
    const { nextLevel, xpTilNextLevel, percentTowardsNextLevel } = this.calcXpTilNextLevel(lastNUpdates[num - 1].value)
    const daysTilNextLevel =  Math.ceil(xpTilNextLevel / dailyAvg)
    const projectedLevelUpDate = Moment().add(daysTilNextLevel, 'days').format(LONG_DATE_STRING)

    return {
      dailyAvg,
      nextLevel,
      xpTilNextLevel,
      daysTilNextLevel,
      projectedLevelUpDate,
      percentTowardsNextLevel,
    }
  }

  render() {
    const { updates } = this.props

    const trainerLevel = getTrainerLevel({ xpUpdates: updates })
    if (!trainerLevel || trainerLevel == 40) {
      return null
    }

    const data = this.createLevelUpData(updates)
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