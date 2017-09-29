import React, { Component } from 'react'
import PropTypes from 'prop-types'

import LevelUpCard from './LevelUpCard'
import LevelUpCarousel from './LevelUpCarousel' 
import { calculateLevelUpData } from './levelUpCalculator'

import { UserScopes } from '../../../app/displayOptions'
import {
  LONG_DATE_STRING,
  getTrainerLevel,
} from '../../../shared/utils'

const lastN = 7
export default class LevelUpComponent extends Component {
  render() {
    const { updates, userScope } = this.props
    if (updates.length < 2) {
      return null
    }

    const trainerLevel = getTrainerLevel({ xpUpdates: updates })
    if (!trainerLevel || trainerLevel == 40) {
      return null
    }

    const data = calculateLevelUpData(updates, lastN)
    const component = userScope == UserScopes.ME ?
      <LevelUpCard data={data} showHeader={false}/> :
      <LevelUpCarousel data={data}/>

    return (
      <div className="card mt-3" style={{ width: "100%" }}>
        <div className="card-header">Level Up Projections ({ lastN }-day moving average)</div>
        { component }
      </div>
    )
  }
}

LevelUpComponent.propTypes = {
  updates: PropTypes.array.isRequired,
  userScope: PropTypes.string.isRequired,
}