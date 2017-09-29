import React, { Component } from 'react'
import PropTypes from 'prop-types'

import LevelUpCard from './LevelUpCard'
import LevelUpCarousel from './LevelUpCarousel' 
import { calculateLevelUpData } from './levelUpCalculator'

import {
  LONG_DATE_STRING,
  getTrainerLevel,
} from '../../../shared/utils'

const lastN = 7
export default class LevelUpComponent extends Component {
  render() {
    const { trainers } = this.props
    if (!trainers.length) {
      return null
    }

    const trainerLevel = getTrainerLevel(trainers[0])
    if (!trainerLevel || trainerLevel == 40) {
      return null
    }

    const data = calculateLevelUpData(trainers[0].xpUpdates, lastN)
    const component = trainers.length > 1 ?
      <LevelUpCarousel data={data}/> :
      <LevelUpCard data={data} showHeader={false}/>

    return (
      <div className="card mt-3" style={{ width: "100%" }}>
        <div className="card-header">Level Up Projections ({ lastN }-day moving average)</div>
        { component }
      </div>
    )
  }
}

LevelUpComponent.propTypes = {
  trainers: PropTypes.array.isRequired,
}