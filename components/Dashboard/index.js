import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ToggleHeader from '../shared/ToggleHeader'
import LevelUpComponent from './LevelUpComponent'
import XPGraph from './XPGraph'
import CatchMap from './CatchMap'
import { UserScopes } from '../../app/displayOptions'

export default class Dashboard extends Component {
  render() {
    const {
      trainer,
      trainers,
      mapScope,
      userScope,
      setMapScope,
      setUserScope,
    } = this.props

    if (!trainer) {
      return null
    }

    const trainersToShow = userScope == UserScopes.ME ?
      [trainer] : trainers.filter(t => t.xpUpdates.length > 0)

    return (
      <div className="mt-3">
        <ToggleHeader
          title="Dashboard"
          enumObject={UserScopes}
          value={userScope}
          onValueChange={setUserScope}
          marginBottom="20px"
        />
        <XPGraph trainers={trainersToShow}/>
        <LevelUpComponent trainers={trainersToShow}/>

        <CatchMap
          trainer={trainer}
          trainers={trainers}
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
  mapScope: PropTypes.string.isRequired,
  userScope: PropTypes.string.isRequired,
  setMapScope: PropTypes.func.isRequired,
  setUserScope: PropTypes.func.isRequired,
}
