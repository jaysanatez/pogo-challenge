import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { TeamStrings } from '../../shared/lookups'
import {
  formatDate,
  DATE_TIME_STRING,
  getTrainerLevel,
} from '../../shared/utils'
import './profileHeader.css'

export default class ProfileHeader extends Component {
  render() {
    const { trainer } = this.props
    const levelStr = getTrainerLevel(trainer) || '???'

    return (
      <div className="card mt-3">
        <div className="card-block">
          <h3 className="card-title">{ trainer.username }</h3>
          <div>
            <span className="subtitle-piece">Level { levelStr }</span>
            <span className="subtitle-spacer">|</span>
            <span className="subtitle-piece">{ TeamStrings[trainer.team] }</span>
            <span className="subtitle-spacer">|</span>
            <span className="subtitle-piece">Updated on { formatDate(trainer.lastUpdated, DATE_TIME_STRING) }</span>
          </div>
        </div>
      </div>
    )
  }
}

ProfileHeader.propTypes = {
  trainer: PropTypes.object.isRequired,
}