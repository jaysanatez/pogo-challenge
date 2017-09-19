import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MapContainer from './MapContainer'

export default class CatchMap extends Component {
  render() {
    const { trainer, catches } = this.props
    return (
      <div className="mt-3">
        <h3>Catch Map</h3>
        <div className="my-3">
          <MapContainer
            className="mt-3"
            trainer={trainer}
            catches={catches}
          />
        </div>
      </div>
    )
  }
}

CatchMap.propTypes = {
  trainer: PropTypes.object.isRequired,
  catches: PropTypes.array.isRequired,
}
