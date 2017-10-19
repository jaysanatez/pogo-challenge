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

    this.state = {}
    this.updatePopupState = this.updatePopupState.bind(this)
  }

  getNameForCatch(_catch) {
    const { trainer, trainers } = this.props
    const t = trainers.find(_t => _t.catches.some(c => c._id == _catch._id))

    if (t && t.username == trainer.username) {
      return 'you'
    } else if (t) {
      return t.username
    } else {
      return 'someone'
    }
  }

  updatePopupState(marker, _catch, trainerName) {
    const { trainer, trainers } = this.props
    this.state = {
      activeMarker: marker,
      trainerName: this.getNameForCatch(_catch),
      _catch,
    }

    this.forceUpdate()
  }

  getMarkers(catches) {
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
      catches,
      mapScope,
    } = this.props

    if (!catches.length)
      return <p className="mt-3 text-center">Add a catch in the Profile page to view the catch map.</p>

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
        { this.getMarkers(catches) }
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.activeMarker != null}
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
