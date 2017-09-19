import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'

import { googleMapsKey } from '../../config'
import MapStyle from './MapStyle'

export class MapContainer extends Component {
  render() {
    const containerStyle = {
      height: '500px',
      width: '100%',
      position: 'relative',
    }

    const style = {
      height: '100%',
      width: '100%',
      position: 'relative',
    }

    const centerOfUSA = {
      lat: 38.8258,
      lng: -96.6852,
    }

    return (
      <Map
        containerStyle={containerStyle}
        style={style}
        google={this.props.google}
        initialCenter={centerOfUSA}
        zoom={4}
        styles={MapStyle}
      />
    )
  }
}

export default GoogleApiWrapper({
 apiKey: googleMapsKey,
})(MapContainer)