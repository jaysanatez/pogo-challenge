import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { UserScopes } from '../../../app/displayOptions'
import MapHeader from './MapHeader'
import MapContainer from './MapContainer'

export default class CatchMap extends Component {
  render() {
    const {
      trainer,
      trainers,
      catches,
      mapScope,
      userScope,
      setMapScope,
    } = this.props

    var myCatches = catches.filter(c => c.userId == trainer._id)
    var uniqueCatchesByOthers = []
    if (userScope == UserScopes.EVERYONE) {
      // we want catches of other locations where I have not caught one
      const sameLocationNameOrCords = (c1, c2) => (c1.locationName == c2.locationName || c1.cord == c2.cord)
      uniqueCatchesByOthers = catches.filter(c1 => {
        return !myCatches.includes(c1) && !myCatches.some(c2 => sameLocationNameOrCords(c1, c2))
      })
    }

    return (
      <div className="mt-3">
        <MapHeader setMapScope={setMapScope}/>
        <div className="my-3">
          <MapContainer
            className="mt-3"
            trainer={trainer}
            trainers={trainers}
            catches={myCatches.concat(uniqueCatchesByOthers)}
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
  catches: PropTypes.array.isRequired,
  mapScope: PropTypes.string.isRequired,
  userScope: PropTypes.string.isRequired,
  setMapScope: PropTypes.func.isRequired,
}
