import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'

import { googleMapsKey } from '../../config'
import MapStyle from './MapStyle'

export class MapContainer extends Component {

  getMarkers(trainer, catches) {
    var markers = []
    catches.filter(c => {
      return c.userId == trainer._id
    }).forEach(c => {
      if (!c.cord)
        return

      markers.push(
        <Marker
          key={c._id}
          title={c.locationName}
          position={c.cord}
        />
      )
    })

    return markers
  }

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

    const dontMoveMap = {
      zoomControl: false,
      scaleControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      draggable: false,
    }

    const { trainer, catches } = this.props
    return (
      <Map
        containerStyle={containerStyle}
        style={style}
        google={this.props.google}
        initialCenter={centerOfUSA}
        zoom={4}
        styles={MapStyle}
        { ...dontMoveMap }
      >
        { this.getMarkers(trainer, catches) }
      </Map>
    )
  }
}

export default GoogleApiWrapper({
 apiKey: googleMapsKey,
})(MapContainer)