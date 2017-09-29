import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DashboardHeader from './DashboardHeader'
import LevelUpComponent from './LevelUpComponent'
import XPGraph from './XPGraph'
import CatchMap from './CatchMap'

export default class Dashboard extends Component {
  render() {
    const {
      trainer,
      trainers,
      catches,
      mapScope,
      userScope,
      setMapScope,
      setUserScope,
    } = this.props

    if (!trainer) {
      return null
    }

    const trainersToShow = trainers.filter(t => t.xpUpdates.length > 0)
    const updates = trainer.xpUpdates || []
    return (
      <div className="mt-3">
        <DashboardHeader setUserScope={setUserScope}/>
        <XPGraph trainer={trainer} trainers={trainersToShow} userScope={userScope}/>
        <LevelUpComponent updates={updates} userScope={userScope}/>

        <CatchMap
          trainer={trainer}
          trainers={trainers}
          catches={catches}
          mapScope={mapScope}
          setMapScope={setMapScope}
          userScope={userScope}
        />
      </div>
    )
  }
}

Dashboard.propTypes = {
  trainer: PropTypes.object,
  trainers: PropTypes.array.isRequired,
  catches: PropTypes.array.isRequired,
  mapScope: PropTypes.string.isRequired,
  userScope: PropTypes.string.isRequired,
  setMapScope: PropTypes.func.isRequired,
  setUserScope: PropTypes.func.isRequired,
}
