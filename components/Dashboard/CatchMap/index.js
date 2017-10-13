import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { UserScopes, MapScopes } from '../../../app/displayOptions'
import ToggleHeader from '../../shared/ToggleHeader'
import MapContainer from './MapContainer'

export default class CatchMap extends Component {
  render() {
    const {
      trainer,
      trainers,
      mapScope,
      userScope,
      setMapScope,
    } = this.props

    var catchesToShow = trainer.catches
    if (userScope == UserScopes.EVERYONE) {
      // we want catches of other locations where I have not caught one
      const otherTrainers = trainers.filter(t => t._id != trainer._id)
      const otherCatches = otherTrainers.map(t => t.catches).reduce((a, b) => a.concat(b))
      catchesToShow = catchesToShow.concat(otherCatches)
    }

    return (
      <div className="mt-3">
        <ToggleHeader
          title="Catch Map"
          enumObject={MapScopes}
          value={mapScope}
          onValueChange={setMapScope}
        />
        <div className="my-3">
          <MapContainer
            className="mt-3"
            trainer={trainer}
            trainers={trainers}
            catches={catchesToShow}
            mapScope={mapScope}
          />
        </div>
      </div>
    )
  }
}

CatchMap.propTypes = {
  trainer: PropTypes.object.isRequired,
  trainers: PropTypes.array.isRequired,
  mapScope: PropTypes.string.isRequired,
  userScope: PropTypes.string.isRequired,
  setMapScope: PropTypes.func.isRequired,
}
