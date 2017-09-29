import React, { Component } from 'react'
import PropTypes from 'prop-types'

import LevelUpCard from './LevelUpCard'
import LevelUpCarousel from './LevelUpCarousel'
import {
  LONG_DATE_STRING,
  getTrainerLevel,
} from '../../../shared/utils'

const lastN = 7
export default class LevelUpComponent extends Component {
  render() {
    const { trainers } = this.props

    const trainersToShow = trainers.filter(t => {
      const trainerLevel = getTrainerLevel(t)
      return trainerLevel && trainerLevel < 40 && t.xpUpdates.length > 1
    })

    if (!trainersToShow.length) {
      return null
    }

    const component = trainersToShow.length > 1 ?
      <LevelUpCarousel trainers={trainersToShow} lastN={lastN}/> :
      <LevelUpCard trainer={trainersToShow[0]} showHeader={false} lastN={lastN}/>

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
