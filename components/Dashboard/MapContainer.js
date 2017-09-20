import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react'

import { googleMapsKey } from '../../config'
import MapStyle from './MapStyle'
import Constants from './MapConstants'
import { formatDate, LONG_DATE_STRING } from '../../shared/utils'
import { getPokemonForId } from '../../assets/utils'

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

  getPopupForActiveMarker() {
    const { activeMarker, _catch } = this.state
    if (!activeMarker || !_catch)
      return <div/>

    const imgSrc = require('../../assets/pokemon/' + _catch.pokemonId + '.png')
    const dateStr = formatDate(_catch.date, LONG_DATE_STRING)
    const pokemon = getPokemonForId(_catch.pokemonId)

    return (
      <div className="container" style={Constants.popupConstants.popupStyle}>
        <div className="row">
          <img src={imgSrc} style={Constants.popupConstants.imgStyle}/>
          <div className="col" style={Constants.popupConstants.textStyle}>
            You caught a { pokemon.name } in { activeMarker.title } on { dateStr }
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { google, trainer, catches } = this.props
    return (
      <Map
        google={google}
        containerStyle={Constants.mapConstants.containerStyle}
        style={Constants.mapConstants.mapStyle}
        initialCenter={Constants.mapConstants.centerOfUSA}
        zoom={4}
        styles={MapStyle}
        { ...Constants.mapConstants.dontMoveMap }
        onClick={ () => this.updatePopupState(null) }
      >
        { this.getMarkers(trainer, catches) }
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showInfoWindow}
        >
          { this.getPopupForActiveMarker() }
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
 apiKey: googleMapsKey,
})(MapContainer)