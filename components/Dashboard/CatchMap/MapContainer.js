import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react'

import { getConfigValue } from '../../../shared/config'
import MapStyle from './MapStyle'
import Constants from './MapConstants'
import MapPopup from './MapPopup'
import { MapScopes } from '../../../app/displayOptions'

export class MapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = { showInfoWindow: false }
    this.updatePopupState = this.updatePopupState.bind(this)
  }

  updatePopupState(marker, _catch) {
    var trainerName
    const { trainer, trainers } = this.props

    if (marker && _catch) {
      const whoCaughtIt = trainers.find(t => t._id == _catch.userId)
      const isMe = whoCaughtIt.username == trainer.username
      trainerName = isMe ? 'you' : whoCaughtIt.username
    }

    this.state = {
      showInfoWindow: marker != null,
      activeMarker: marker,
      trainerName,
      _catch,
    }

    this.forceUpdate()
  }

  getMarkers(trainer, catches) {
    return catches.map(c => {
      if (!c.cord)
        return null

      return (
        <Marker
          key={c._id}
          title={c.locationName}
          position={c.cord}
          icon={Constants.markerConstants.pokeballIcon}
          onClick={ (props, marker) => this.updatePopupState(marker, c) }
        />
      )
    })
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
        onClick={this.updatePopupStates}
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
 apiKey: getConfigValue('GOOGLE_MAPS_KEY'),
})(MapContainer)
