import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react'

import { getConfigValue } from '../../../config'
import MapStyle from './MapStyle'
import Constants from './MapConstants'
import MapPopup from './MapPopup'
import { MapScopes } from '../../../app/displayOptions'

export class MapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = { visible: false }
    this.updatePopupState = this.updatePopupState.bind(this)
  }

  updatePopupState(marker, _catch) {
    this.state = {
      showInfoWindow: marker != null,
      activeMarker: marker,
      _catch,
    }

    this.forceUpdate()
  }

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
          icon={Constants.markerConstants.pokeballIcon}
          onClick={ (props, marker) => this.updatePopupState(marker, c) }
        />
      )
    })

    return markers
  }

  render() {
    const {
      google,
      trainer,
      catches,
      mapScope,
    } = this.props

    return (
      <Map
        google={google}
        containerStyle={Constants.mapConstants.containerStyle}
        style={Constants.mapConstants.mapStyle}
        initialCenter={Constants.mapConstants.centers[mapScope]}
        center={Constants.mapConstants.centers[mapScope]}
        zoom={Constants.mapConstants.zoomLevels[mapScope]}
        styles={MapStyle}
        { ...Constants.mapConstants.dontMoveMap }
        onClick={ () => this.updatePopupState(null) }
      >
        { this.getMarkers(trainer, catches) }
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showInfoWindow}
        >
          <MapPopup state={this.state}/>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
 apiKey: getConfigValue('googleMapsKey'),
})(MapContainer)