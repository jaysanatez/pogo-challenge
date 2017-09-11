import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { TeamStrings } from '../../shared/lookups'
import {
  formatDate,
  DATE_TIME_STRING,
  getTrainerLevel,
} from '../../shared/utils'

export default class ProfileHeader extends Component {
  render() {
  	const { trainer } = this.props
    return (
  	  <div className="card mt-3">
        <div className="card-block">
          <h3 className="card-title">{ trainer.username }</h3>
          <p className="card-text">
            Level { getTrainerLevel(trainer) || '???' } | { TeamStrings[trainer.team] } | Updated on { formatDate(trainer.lastUpdated, DATE_TIME_STRING) }
          </p>
        </div>
      </div>
    )
  }
}

ProfileHeader.propTypes = {
  trainer: PropTypes.object.isRequired,
}