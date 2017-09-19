import React, { Component } from 'react'
import MapContainer from './MapContainer'

export default class CatchMap extends Component {
  render() {
    return (
      <div className="mt-3">
        <h3>Catch Map</h3>
        <div className="mt-3">
          <MapContainer className="mt-3"/>
        </div>
      </div>
    )
  }
}
