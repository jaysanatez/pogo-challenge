import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MapHeader from './MapHeader'
import MapContainer from './MapContainer'

export default class CatchMap extends Component {
  render() {
    const {
      trainer,
      catches,
      mapScope,
      setMapScope,
    } = this.props

    return (
      <div className="mt-3">
        <MapHeader setMapScope={setMapScope}/>
        <div className="my-3">
          <MapContainer
            className="mt-3"
            trainer={trainer}
            catches={catches}
            mapScope={mapScope}
          />
        </div>
      </div>
    )
  }
}

CatchMap.propTypes = {
  trainer: PropTypes.object.isRequired,
  catches: PropTypes.array.isRequired,
  setMapScope: PropTypes.func.isRequired,
}
